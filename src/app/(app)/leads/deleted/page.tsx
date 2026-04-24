import { createServiceClient } from "@/lib/supabase/server";
import { getCurrentWorkspaceId } from "@/lib/workspace";
import { sourceLabel } from "@/lib/constants";
import Link from "next/link";
import { DeletedLeadActions } from "@/components/deleted-lead-actions";

export default async function DeletedLeadsPage() {
  const supabase = createServiceClient();
  const WORKSPACE_ID = await getCurrentWorkspaceId();

  const { data: leadsRaw } = await supabase
    .from("leads")
    .select("id, full_name, phone, email, source, deleted_at, updated_at")
    .eq("workspace_id", WORKSPACE_ID)
    .eq("archived", true)
    .order("deleted_at", { ascending: false })
    .limit(200);

  const leads = leadsRaw ?? [];

  return (
    <div className="px-7 py-7 max-w-6xl mx-auto anim-page">
      {/* Header */}
      <div className="flex items-center justify-between heat-glow -mx-7 -mt-7 px-7 pt-7 pb-5 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Usunięte leady</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--muted)" }}>
            {leads.length === 0
              ? "Brak usuniętych leadów"
              : `${leads.length} ${leads.length === 1 ? "lead" : "leadów"} w koszu`}
          </p>
        </div>
        <Link
          href="/leads"
          className="px-3.5 py-2 rounded-md text-[13px] font-medium transition-colors"
          style={{ color: "var(--muted)", border: "1px solid var(--border-strong)" }}
        >
          ← Powrót do leadów
        </Link>
      </div>

      {leads.length === 0 ? (
        <div
          className="rounded-lg flex flex-col items-center justify-center py-20 text-center"
          style={{ background: "var(--panel-solid)", border: "1px solid var(--border)" }}
        >
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑</div>
          <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>Kosz jest pusty</p>
          <p className="text-[13px] mt-1" style={{ color: "var(--muted)" }}>
            Usunięte leady pojawią się tutaj i można je przywrócić lub trwale usunąć.
          </p>
        </div>
      ) : (
        <>
          <div
            className="text-[12px] px-4 py-3 rounded-lg mb-4"
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#b91c1c",
            }}
          >
            Leady w koszu można przywrócić lub trwale usunąć. Trwałe usunięcie jest nieodwracalne.
          </div>

          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "var(--panel-solid)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Imię i nazwisko", "Telefon", "E-mail", "Źródło", "Usunięto", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-medium text-[11.5px] uppercase tracking-[0.07em]"
                      style={{ color: "var(--muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const deletedAt = lead.deleted_at ?? lead.updated_at;
                  return (
                    <tr
                      key={lead.id}
                      className="transition-colors"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--text)" }}>
                        {lead.full_name}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                        {lead.phone ?? "—"}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                        {lead.email ?? "—"}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                        {sourceLabel[lead.source] ?? lead.source}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-[12px]" style={{ color: "var(--muted)" }}>
                        {new Date(deletedAt).toLocaleString("pl-PL", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <DeletedLeadActions leadId={lead.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
