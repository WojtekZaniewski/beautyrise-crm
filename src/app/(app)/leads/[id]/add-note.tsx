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
    </form>
  );
}
