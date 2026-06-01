import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { syncEmailAccount, type EmailAccountRow, type SyncResult } from "@/lib/email/sync-account";

export const maxDuration = 300;

async function runSync(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && authHeader !== "Bearer manual") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: accounts } = await supabase
    .from("email_accounts")
    .select("id, workspace_id, email, display_name, password_enc")
    .eq("is_active", true);

  if (!accounts || accounts.length === 0) {
    return NextResponse.json({ ok: true, synced: 0, message: "Brak aktywnych kont email" });
  }

  const results: SyncResult[] = [];
  for (const account of accounts as EmailAccountRow[]) {
    try {
      const res = await syncEmailAccount(supabase, account, { limit: 30 });
      results.push(res);
    } catch (err) {
      results.push({
        account_id: account.id,
        email: account.email,
        fetched: 0,
        inserted: 0,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  const totalInserted = results.reduce((s, r) => s + r.inserted, 0);
  return NextResponse.json({ ok: true, accounts: results.length, inserted: totalInserted, results });
}

export async function GET(request: Request) {
  return runSync(request);
}

export async function POST(request: Request) {
  return runSync(request);
}
