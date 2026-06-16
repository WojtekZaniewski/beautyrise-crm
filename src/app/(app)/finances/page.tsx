import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { FinanceColumn, type FinanceEntry } from "./entries-client";
import { FinanceCharts } from "./charts";
import Link from "next/link";

type SearchParams = Promise<{ month?: string }>;

function getMonthLabel(month: string) {
  const [year, m] = month.split("-");
  const d = new Date(Number(year), Number(m) - 1, 1);
  return d.toLocaleDateString("pl-PL", { month: "long", year: "numeric" });
}

function prevMonth(month: string) {
  const [year, m] = month.split("-").map(Number);
  const d = new Date(year, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function nextMonth(month: string) {
  const [year, m] = month.split("-").map(Number);
  const d = new Date(year, m, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function fmtPln(n: number) {
  return n.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
}

function shortMonth(month: string) {
  const [year, m] = month.split("-");
  const d = new Date(Number(year), Number(m) - 1, 1);
  return d.toLocaleDateString("pl-PL", { month: "short" }).replace(".", "");
}

export default async function FinancesPage({ searchParams }: { searchParams: SearchParams }) {
  const { month: monthParam } = await searchParams;
  const now = new Date();
  const currentMonth = monthParam ?? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const supabase = createServiceClient();
  const workspaceId = await getCurrentWorkspaceId();

  const [year, m] = currentMonth.split("-");
  const fromDate = `${year}-${m}-01`;
  const lastDay = new Date(Number(year), Number(m), 0).getDate();
  const toDate = `${year}-${m}-${String(lastDay).padStart(2, "0")}`;

  const sixMonthsAgo = new Date(Number(year), Number(m) - 7, 1);
  const histFrom = `${sixMonthsAgo.getFullYear()}-${String(sixMonthsAgo.getMonth() + 1).padStart(2, "0")}-01`;

  // Run queries in parallel (Meta ad spend joins through campaigns for workspace scoping)
  const [{ data: entries = [] }, { data: histEntries = [] }, { data: metaMetrics = [] }] = await Promise.all([
    supabase
      .from("finance_entries")
      .select("id, type, amount_pln, category, description, date, status, client_name, created_at")
      .eq("workspace_id", workspaceId)
      .gte("date", fromDate)
      .lte("date", toDate)
      .order("date", { ascending: false }),
    supabase
      .from("finance_entries")
      .select("type, amount_pln, date, status")
      .eq("workspace_id", workspaceId)
      .gte("date", histFrom)
      .lte("date", toDate)
      .order("date", { ascending: true }),
    supabase
      .from("campaign_metrics_daily")
      .select("date, spend, campaigns!inner(workspace_id)")
      .eq("campaigns.workspace_id", workspaceId)
      .gte("date", histFrom)
      .lte("date", toDate),
  ]);

  // Meta Ads spend: current month total + per-month sums for the history chart
  const metaSpendByMonth = new Map<string, number>();
  for (const row of (metaMetrics ?? []) as Array<{ date: string; spend: string | null }>) {
    const mKey = row.date.slice(0, 7);
    metaSpendByMonth.set(mKey, (metaSpendByMonth.get(mKey) ?? 0) + parseFloat(row.spend ?? "0"));
  }
  const metaSpendMonth = metaSpendByMonth.get(currentMonth) ?? 0;

  const all = (entries ?? []) as FinanceEntry[];
  const incomeEntries = all.filter((e) => e.type === "income");
  const expenseEntries = all.filter((e) => e.type === "expense");

  const receivedIncome = incomeEntries
    .filter((e) => e.status !== "potential")
    .reduce((sum, e) => sum + Number(e.amount_pln), 0);
  const potentialIncome = incomeEntries
    .filter((e) => e.status === "potential")
    .reduce((sum, e) => sum + Number(e.amount_pln), 0);
  const totalIncome = receivedIncome + potentialIncome;
  const totalExpense = expenseEntries.reduce((sum, e) => sum + Number(e.amount_pln), 0) + metaSpendMonth;
  const profit = receivedIncome - totalExpense;
  const margin = totalIncome > 0 ? (profit / totalIncome) * 100 : null;
  const expenseRatio = totalIncome > 0 ? Math.min(100, (totalExpense / totalIncome) * 100) : 0;

  // Build 6-month bar chart data
  const monthMap = new Map<string, { income: number; potential: number; expense: number }>();
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Number(year), Number(m) - 1 - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthMap.set(key, { income: 0, potential: 0, expense: 0 });
    months.push(key);
  }
  for (const e of histEntries ?? []) {
    const mKey = (e.date as string).slice(0, 7);
    const existing = monthMap.get(mKey);
    if (!existing) continue;
    if (e.type === "income") {
      if ((e as { status?: string }).status === "potential") existing.potential += Number(e.amount_pln);
      else existing.income += Number(e.amount_pln);
    } else {
      existing.expense += Number(e.amount_pln);
    }
  }

  const monthlyData = months.map((mKey) => {
    const { income, potential, expense } = monthMap.get(mKey)!;
    const expenseWithMeta = expense + (metaSpendByMonth.get(mKey) ?? 0);
    return { month: shortMonth(mKey), income, potential, expense: expenseWithMeta, profit: income - expenseWithMeta };
  });

  // Category breakdown for expenses (current month)
  const catMap = new Map<string, number>();
  for (const e of expenseEntries) {
    const cat = e.category ?? "other";
    catMap.set(cat, (catMap.get(cat) ?? 0) + Number(e.amount_pln));
  }
  if (metaSpendMonth > 0) catMap.set("ads", (catMap.get("ads") ?? 0) + metaSpendMonth);
  const categoryData = [...catMap.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const monthLabel = getMonthLabel(currentMonth);
  const prev = prevMonth(currentMonth);
  const next = nextMonth(currentMonth);
  const todayMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const isCurrentMonth = currentMonth === todayMonth;

  return (
    <div className="finance-colors px-4 py-4 sm:px-8 sm:py-8 max-w-5xl mx-auto anim-page">
      <div className="heat-glow -mx-4 sm:-mx-8 -mt-4 sm:-mt-8 px-4 sm:px-8 pt-4 sm:pt-8 pb-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Finanse</h1>
            <p className="text-sm text-[var(--muted)]">Miesięczny tracker przychodów i wydatków</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/finances?month=${prev}`}
              className="p-1.5 rounded-lg hover:bg-[var(--ba-4)] transition-colors text-[var(--muted)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="text-[14px] font-semibold capitalize min-w-[140px] text-center">{monthLabel}</span>
            <Link href={`/finances?month=${next}`}
              className={`p-1.5 rounded-lg hover:bg-[var(--ba-4)] transition-colors text-[var(--muted)] ${isCurrentMonth ? "pointer-events-none opacity-30" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: "var(--panel)", border: "1px solid var(--border)" }}>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1">Przychód</div>
            <div className="text-[18px] font-semibold" style={{ color: "#22c55e" }}>{fmtPln(receivedIncome)}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1">Potencjalny</div>
            <div className="text-[18px] font-semibold" style={{ color: potentialIncome > 0 ? "#f59e0b" : "var(--muted)" }}>
              {fmtPln(potentialIncome)}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1">Wydatki</div>
            <div className="text-[18px] font-semibold" style={{ color: "#ef4444" }}>{fmtPln(totalExpense)}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1">Zysk / Strata</div>
            <div className="text-[20px] font-bold" style={{ color: profit >= 0 ? "#22c55e" : "#ef4444" }}>
              {profit >= 0 ? "+" : ""}{fmtPln(profit)}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--muted)] mb-1">Marża</div>
            <div className="text-[18px] font-semibold"
              style={{ color: margin == null ? "var(--muted)" : margin >= 0 ? "#22c55e" : "#ef4444" }}>
              {margin == null ? "—" : `${margin.toFixed(1)}%`}
            </div>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--ba-4)" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${expenseRatio}%`,
              background: expenseRatio > 80 ? "#ef4444" : expenseRatio > 50 ? "#f59e0b" : "#22c55e",
            }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[var(--muted)]">Wydatki {expenseRatio.toFixed(0)}% przychodu</span>
          {expenseRatio > 80 && <span className="text-[10px]" style={{ color: "#ef4444" }}>Wysokie wydatki</span>}
        </div>
      </div>

      {/* Charts */}
      <FinanceCharts monthlyData={monthlyData} categoryData={categoryData} />

      {/* Two-column entry lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinanceColumn type="income" initialEntries={incomeEntries} month={currentMonth} />
        <FinanceColumn type="expense" initialEntries={expenseEntries} month={currentMonth} metaSpend={metaSpendMonth} />
      </div>
    </div>
  );
}
