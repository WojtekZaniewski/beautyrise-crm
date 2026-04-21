import { createClient } from "@/lib/supabase/server";
import { sourceLabel } from "@/lib/constants";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { NextResponse } from "next/server";

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const stage = url.searchParams.get("stage");
  const source = url.searchParams.get("source");
  const tag = url.searchParams.get("tag");

  const supabase = await createClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  let query = supabase
    .from("leads")
    .select(`
      id, full_name, phone, email, source, notes, value_pln, created_at,
      pipeline_stages ( name ),
      lead_tags ( tags ( id, name ) )
    `)
    .eq("workspace_id", WORKSPACE_ID)
    .eq("archived", false);

  if (stage) query = query.eq("stage_id", stage);
  if (source) query = query.eq("source", source);
  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,phone.ilike.%${q}%,email.ilike.%${q}%`,
    );
  }

  const { data: rows } = await query.order("created_at", { ascending: false });
  let leads = rows ?? [];

  if (tag) {
    leads = leads.filter((l) =>
      ((l.lead_tags as unknown as Array<{ tags: { id: string } | null }>) ?? []).some(
        (lt) => lt.tags?.id === tag,
      ),
    );
  }

  const headers = [
    "Imię i nazwisko",
    "Telefon",
    "E-mail",
    "Etap",
    "Źródło",
    "Tagi",
    "Wartość (PLN)",
    "Notatki",
    "Data utworzenia",
  ];

  const lines = [headers.map(csvEscape).join(",")];

  for (const lead of leads) {
    const stageName = (lead.pipeline_stages as unknown as { name: string } | null)?.name ?? "";
    const tagNames = ((lead.lead_tags as unknown as Array<{ tags: { name: string } | null }>) ?? [])
      .map((lt) => lt.tags?.name)
      .filter(Boolean)
      .join(", ");

    lines.push(
      [
        lead.full_name,
        lead.phone ?? "",
        lead.email ?? "",
        stageName,
        sourceLabel[lead.source] ?? lead.source,
        tagNames,
        lead.value_pln ?? "",
        lead.notes ?? "",
        new Date(lead.created_at).toLocaleString("pl-PL"),
      ].map(csvEscape).join(","),
    );
  }

  const csv = "\uFEFF" + lines.join("\n"); // BOM dla Excela
  const filename = `leady-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
