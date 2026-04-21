import { cache } from "react";
import { cookies } from "next/headers";
import { unstable_cache, revalidateTag } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
};

const COOKIE_NAME = "current_workspace_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const WORKSPACES_TAG = "workspaces";

const fetchAllWorkspaces = unstable_cache(
  async (): Promise<Workspace[]> => {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("workspaces")
      .select("id, name, slug")
      .order("created_at", { ascending: true });
    return data ?? [];
  },
  ["workspaces-all"],
  { tags: [WORKSPACES_TAG], revalidate: 300 },
);

// Per-request dedupe on top of cross-request cache
export const getAllWorkspaces = cache(async (): Promise<Workspace[]> => {
  return fetchAllWorkspaces();
});

export const getCurrentWorkspaceId = cache(async (): Promise<string> => {
  const [cookieStore, all] = await Promise.all([cookies(), getAllWorkspaces()]);
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value;

  if (all.length === 0) {
    throw new Error("Brak jakiegokolwiek workspace'u w bazie");
  }

  if (cookieValue && all.some((w) => w.id === cookieValue)) {
    return cookieValue;
  }

  return all[0].id;
});

export const getCurrentWorkspace = cache(async (): Promise<Workspace> => {
  const [id, all] = await Promise.all([getCurrentWorkspaceId(), getAllWorkspaces()]);
  const found = all.find((w) => w.id === id);
  if (!found) throw new Error("Workspace not found");
  return found;
});

export function workspaceCookieConfig() {
  return {
    name: COOKIE_NAME,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax" as const,
    httpOnly: false,
  };
}

export function invalidateWorkspaces() {
  revalidateTag(WORKSPACES_TAG, "max");
}
