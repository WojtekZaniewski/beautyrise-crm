"use client";

import { useSearchParams, useRouter } from "next/navigation";

type CampaignRef = { id: string; name: string };

const INT_COLOR: Record<string, string> = {
  meta_ads: "#3b82f6",
  email:    "#8b5cf6",
  sms:      "#22c55e",
};

export function IntegrationSidebar({
  leadId,
  hasMetaAds,
  metaCampaignName,
  emailCampaigns,
  smsCampaigns,
}: {
  leadId: string;
  hasMetaAds: boolean;
  metaCampaignName?: string | null;
  emailCampaigns: CampaignRef[];
  smsCampaigns: CampaignRef[];
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const ctx = sp.get("ctx") ?? "general";
  const cid = sp.get("cid") ?? "";

  function go(newCtx: string, newCid?: string) {
    const p = new URLSearchParams();
    if (newCtx !== "general") p.set("ctx", newCtx);
    if (newCid) p.set("cid", newCid);
    const q = p.toString();
    router.push(`/leads/${leadId}${q ? `?${q}` : ""}`);
  }

  const hasAny = hasMetaAds || emailCampaigns.length > 0 || smsCampaigns.length > 0;
  if (!hasAny) return null;

  const row = (active: boolean, color: string): React.CSSProperties => ({
    width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: "7px",
    fontSize: "12.5px", fontWeight: 500, cursor: "pointer", display: "flex",
    alignItems: "center", gap: "7px",
    border: active ? `1px solid ${color}45` : "1px solid transparent",
    background: active ? `${color}10` : "transparent",
    color: active ? color : "var(--muted)",
    transition: "all 0.12s",
  });

  return (
    <div
      style={{
        background: "var(--panel-solid)", border: "1px solid var(--border)",
        borderRadius: "8px", boxShadow: "var(--shadow-sm)", padding: "14px 12px",
      }}
    >
      <div style={{ fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px", paddingLeft: "2px" }}>
        Integracja / Kampania
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {/* General */}
        <button style={row(ctx === "general", "var(--accent)")} onClick={() => go("general")}>
          <span style={{ fontSize: "12px" }}>📋</span>
          <span>Ogólny</span>
        </button>

        {/* Meta Ads */}
        {hasMetaAds && (
          <button style={row(ctx === "meta_ads", INT_COLOR.meta_ads)} onClick={() => go("meta_ads")}>
            <span style={{ fontSize: "10px", fontWeight: 800, padding: "1px 4px", borderRadius: "3px", background: INT_COLOR.meta_ads + "20", color: INT_COLOR.meta_ads, lineHeight: 1.4 }}>f</span>
            <span className="truncate">Meta Ads{metaCampaignName ? ` — ${metaCampaignName}` : ""}</span>
          </button>
        )}

        {/* Email campaigns */}
        {emailCampaigns.length > 0 && (
          <div style={{ marginTop: "4px" }}>
            <div style={{ fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--muted)", padding: "4px 10px 2px", opacity: 0.7 }}>
              E-mail
            </div>
            {emailCampaigns.map((c) => (
              <button key={c.id} style={row(ctx === "email" && cid === c.id, INT_COLOR.email)} onClick={() => go("email", c.id)}>
                <span>📧</span>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* SMS campaigns */}
        {smsCampaigns.length > 0 && (
          <div style={{ marginTop: "4px" }}>
            <div style={{ fontSize: "9.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--muted)", padding: "4px 10px 2px", opacity: 0.7 }}>
              SMS
            </div>
            {smsCampaigns.map((c) => (
              <button key={c.id} style={row(ctx === "sms" && cid === c.id, INT_COLOR.sms)} onClick={() => go("sms", c.id)}>
                <span>✉</span>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
