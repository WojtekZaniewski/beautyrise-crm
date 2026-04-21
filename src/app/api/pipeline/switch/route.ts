import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pipelineCookieConfig } from "@/lib/pipeline";

export async function POST(request: Request) {
  const { pipeline_id } = (await request.json()) as { pipeline_id: string };
  if (!pipeline_id) {
    return NextResponse.json({ error: "pipeline_id required" }, { status: 400 });
  }

  const cfg = pipelineCookieConfig();
  const cookieStore = await cookies();
  cookieStore.set(cfg.name, pipeline_id, cfg);

  return NextResponse.json({ ok: true });
}
