"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type CampaignRef = { id: string; name: string };

const sel: React.CSSProperties = {
  width: "100%", borderRadius: "8px", padding: "9px 12px", fontSize: "13px",
  outline: "none", background: "var(--ba-4)", border: "1px solid var(--border-strong)",
  color: "var(--text)", appearance: "auto", cursor: "pointer",
};

export function IntegrationSidebar({
  leadId,
  hasMetaAds,
  emailCampaigns,
  smsCampaigns,
}: {
  leadId: string;
  hasMetaAds: boolean;
  emailCampaigns: CampaignRef[];
  smsCampaigns: CampaignRef[];
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const initCtx = sp.get("ctx") ?? "";
  const initCid = sp.get("cid") ?? "";

  const [intType, setIntType] = useState(initCtx);
  const [campaignId, setCampaignId] = useState(initCid);

  const hasAny = hasMetaAds || emailCampaigns.length > 0 || smsCampaigns.length > 0;
  if (!hasAny) return null;

  function navigate(ctx: string, cid?: string) {
    const p = new URLSearchParams();
    if (ctx) p.set("ctx", ctx);
    if (cid) p.set("cid", cid);
    const q = p.toString();
    router.push(`/leads/${leadId}${q ? `?${q}` : ""}`);
  }

  function handleIntChange(val: string) {
    setIntType(val);
    setCampaignId("");
    if (!val) { navigate(""); return; }
    // Meta Ads has no sub-campaign picker — navigate immediately
    if (val === "meta_ads") { navigate("meta_ads"); return; }
    // email / sms — wait for campaign selection
  }

  function handleCampaignChange(val: string) {
    setCampaignId(val);
    if (val) navigate(intType, val);
  }

  const showCampaignPicker = (intType === "email" || intType === "sms") && (
    (intType === "email" && emailCampaigns.length > 0) ||
    (intType === "sms" && smsCampaigns.length > 0)
  );
  const campaignOptions = intType === "email" ? emailCampaigns : intType === "sms" ? smsCampaigns : [];

  return (
    <div
      style={{
        background: "var(--panel-solid)", border: "1px solid var(--border)",
        borderRadius: "8px", boxShadow: "var(--shadow-sm)", padding: "16px",
        display: "flex", flexDirection: "column", gap: "10px",
      }}
    >
      {/* Integration type picker */}
      <div>
        <label style={{ fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", display: "block", marginBottom: "6px" }}>
          Integracja
        </label>
        <select value={intType} onChange={(e) => handleIntChange(e.target.value)} style={sel}>
          <option value="">— Ogólny (bez integracji) —</option>
          {hasMetaAds && <option value="meta_ads">Meta Ads</option>}
          {emailCampaigns.length > 0 && <option value="email">E-mail</option>}
          {smsCampaigns.length > 0 && <option value="sms">SMS</option>}
        </select>
      </div>

      {/* Campaign picker — shown for email/sms */}
      {showCampaignPicker && (
        <div>
          <label style={{ fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", display: "block", marginBottom: "6px" }}>
            Kampania
          </label>
          <select value={campaignId} onChange={(e) => handleCampaignChange(e.target.value)} style={sel}>
            <option value="">— Wybierz kampanię —</option>
            {campaignOptions.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
