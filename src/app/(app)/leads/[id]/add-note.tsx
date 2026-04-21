"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AddNote({ leadId }: { leadId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    await supabase.from("lead_events").insert({
      lead_id: leadId,
      type: "note",
      payload: { text: text.trim() },
    });

    setText("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Dodaj notatkę…"
        className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] transition-colors"
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
      >
        {loading ? "…" : "Dodaj"}
      </button>
    </form>
  );
}
