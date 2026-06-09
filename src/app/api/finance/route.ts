import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const month = req.nextUrl.searchParams.get("month"); // e.g. "2026-06"

  let query = supabase
    .from("finance_entries")
    .select("id, type, amount_pln, category, description, date, created_at")
    .eq("workspace_id", workspaceId)
    .order("date", { ascending: false });

  if (month) {
    const [year, m] = month.split("-");
    const from = `${year}-${m}-01`;
    const lastDay = new Date(Number(year), Number(m), 0).getDate();
    const to = `${year}-${m}-${String(lastDay).padStart(2, "0")}`;
    query = query.gte("date", from).lte("date", to);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();
  const body = await req.json() as {
    type?: string; amount_pln?: unknown; category?: string;
    description?: string; date?: string;
  };

  const { type, amount_pln, category, description, date } = body;
  if (!type || !["income", "expense"].includes(type)) {
    return NextResponse.json({ error: "Nieprawidłowy typ" }, { status: 400 });
  }
  const amount = parseFloat(String(amount_pln));
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Nieprawidłowa kwota" }, { status: 400 });
  }
  if (!description?.trim()) {
    return NextResponse.json({ error: "Brak opisu" }, { status: 400 });
  }
  if (!date) {
    return NextResponse.json({ error: "Brak daty" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("finance_entries")
    .insert({
      workspace_id: workspaceId,
      type,
      amount_pln: amount,
      category: category?.trim() || null,
      description: description.trim(),
      date,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
