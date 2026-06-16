import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";

export async function GET() {
  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  const sinceDate = sixMonthsAgo.toISOString().split("T")[0];

  const [incomeRes, leadsRes] = await Promise.all([
    supabase
      .from("finance_entries")
      .select("amount_pln, date")
      .eq("workspace_id", workspaceId)
      .eq("type", "income")
      .eq("status", "received")
      .gte("date", sinceDate),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null),
  ]);

  const entries = incomeRes.data ?? [];

  // Group received income by month (YYYY-MM)
  const byMonth = new Map<string, number>();
  for (const entry of entries) {
    const month = (entry.date as string).substring(0, 7);
    byMonth.set(month, (byMonth.get(month) ?? 0) + Number(entry.amount_pln));
  }

  // Build last 6 months array, including months with zero income
  const months: { month: string; income: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const month = d.toISOString().substring(0, 7);
    months.push({ month, income: Math.round((byMonth.get(month) ?? 0) * 100) / 100 });
  }

  // Average of last 3 months that have income > 0
  const last3WithData = months.slice(-3).filter((m) => m.income > 0);
  const avgMonthlyRevenue =
    last3WithData.length > 0
      ? Math.round(last3WithData.reduce((s, m) => s + m.income, 0) / last3WithData.length)
      : 0;

  return NextResponse.json({
    months,
    avgMonthlyRevenue,
    leadsCount: leadsRes.count ?? 0,
  });
}
