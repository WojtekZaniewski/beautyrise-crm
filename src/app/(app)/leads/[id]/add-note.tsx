"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CampaignRef = { id: string; name: string };

export function AddNote({
  leadId,
  emailCampaigns = [],
  smsCampaigns = [],
}: {
  leadId: string;
  emailCampaigns?: CampaignRef[];
  smsCampaigns?: CampaignRef[];
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [contextType, setContextType] = useState<"general" | "email" | "sms">("general");
  const [campaignId, setCampaignId] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const router = useRouter();

  const hasContextOptions = emailCampaigns.length > 0 || smsCampaigns.length > 0;

  function selectCampaign(type: "email" | "sms", id: string, name: string) {
    setContextType(type);
    setCampaignId(id);
    setCampaignName(name);
  }

  function selectGeneral() {
    setContextType("general");
    setCampaignId("");
    setCampaignName("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    const body: Record<string, string> = { text: text.trim(), context_type: contextType };
    if (contextType !== "general" && campaignId) {
      body.campaign_id = campaignId;
      body.campaign_name = campaignName;
    }

    await fetch(`/api/leads/${leadId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setText("");
    setLoading(false);
    router.refresh();
  }

  const btnActive = (active: boolean, color: string) => ({
    padding: "4px 10px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 500,
    border: active ? `1px solid ${color}55` : "1px solid var(--border-strong)",
    background: active ? `${color}12` : "transparent",
    color: active ? color : "var(--muted)",
    cursor: "pointer", transition: "all 0.12s", whiteSpace: "nowrap",
  } as React.CSSProperties);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {hasContextOptions && (
        <div className="flex flex-wrap gap-1.5">
          <button type="button" style={btnActive(contextType === "general", "var(--accent)")} onClick={selectGeneral}>
            Ogólna
          </button>
          {emailCampaigns.map((c) => (
            <button
              key={c.id}
              type="button"
              style={btnActive(contextType === "email" && campaignId === c.id, "#FF4C00")}
              onClick={() => selectCampaign("email", c.id, c.name)}
            >
              📧 {c.name}
            </button>
          ))}
          {smsCampaigns.map((c) => (
            <button
              key={c.id}
              type="button"
              style={btnActive(contextType === "sms" && campaignId === c.id, "#FF4C00")}
              onClick={() => selectCampaign("sms", c.id, c.name)}
            >
              ✉ {c.name}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            contextType === "general"
              ? "Dodaj notatkę ogólną…"
              : `Notatka do kampanii "${campaignName}"…`
          }
          className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
          style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)", color: "var(--text)" }}
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="btn-primary disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-medium"
        >
          {loading ? "…" : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
