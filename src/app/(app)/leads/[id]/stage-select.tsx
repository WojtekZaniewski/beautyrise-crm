"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Stage = { id: string; name: string; color: string };

export function StageSelect({
  leadId,
  currentStageId,
  currentStageName,
  stages,
}: {
  leadId: string;
  currentStageId: string | null;
  currentStageName?: string;
  stages: Stage[];
}) {
  const [value, setValue] = useState(currentStageId ?? "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleChange(newStageId: string) {
    setValue(newStageId);
    setLoading(true);
    const newStage = stages.find((s) => s.id === newStageId);

    await supabase
      .from("leads")
      .update({ stage_id: newStageId, updated_at: new Date().toISOString() })
      .eq("id", leadId);

    await supabase.from("lead_events").insert({
      lead_id: leadId,
      type: "stage_change",
      payload: { from: currentStageName, to: newStage?.name },
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
    >
      <option value="">— brak etapu —</option>
      {stages.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
