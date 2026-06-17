"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Lets the signed-in user set their display name (stored in auth user_metadata.full_name).
// This name is what appears on FOS task columns, attributions and activity notifications.
export function AccountNameForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function save() {
    const trimmed = name.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ data: { full_name: trimmed } });
    setSaving(false);
    if (!error) {
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <div className="glass-card rounded-xl p-5 mb-5">
      <h2 className="text-[14px] font-semibold mb-1">Twoja nazwa wyświetlana</h2>
      <p className="text-[12.5px] mb-3" style={{ color: "var(--muted)" }}>
        Tak podpisują się Twoje zadania, przypisania i powiadomienia w Founder OS.
      </p>
      <div className="flex gap-2 max-w-sm">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") save(); }}
          placeholder="np. Wojtek"
          className="flex-1 px-3 py-2 rounded-lg text-[13px] outline-none"
          style={{ background: "var(--ba-4)", border: "1px solid var(--border)", color: "var(--text)" }}
        />
        <button
          onClick={save}
          disabled={saving || !name.trim()}
          className="btn-primary rounded-lg px-4 py-2 text-[13px] disabled:opacity-50 shrink-0"
        >
          {saving ? "Zapisywanie…" : saved ? "Zapisano ✓" : "Zapisz"}
        </button>
      </div>
    </div>
  );
}
