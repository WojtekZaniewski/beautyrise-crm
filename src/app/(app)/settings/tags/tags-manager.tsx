"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toPaletteColor } from "@/lib/palette";

type Tag = { id: string; name: string; color: string };

const PALETTE = [
  "#FF4C00", "#FF6B35", "#FF8C42", "#FFA76B",
  "#C2410C", "#9A3412", "#1C1917", "#78716C",
];

export function TagsManager({
  initialTags,
  workspaceId,
}: {
  initialTags: Tag[];
  workspaceId: string;
}) {
  const supabase = createClient();
  const [tags, setTags] = useState(initialTags);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(PALETTE[0]);
  const [loading, setLoading] = useState(false);

  async function addTag() {
    if (!newName.trim()) return;
    setLoading(true);
    const { data } = await supabase
      .from("tags")
      .insert({ workspace_id: workspaceId, name: newName.trim(), color: newColor })
      .select("id, name, color")
      .single();
    if (data) setTags([...tags, data]);
    setNewName("");
    setLoading(false);
  }

  async function deleteTag(id: string) {
    setTags(tags.filter((t) => t.id !== id));
    await supabase.from("tags").delete().eq("id", id);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="text-sm font-medium mb-3 text-[var(--text)]">Dodaj nowy tag</div>
        <div className="flex gap-3 items-center">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            placeholder="Nazwa tagu (np. VIP)"
            className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-all"
            style={{ background: "var(--ba-4)", border: "1px solid var(--border-strong)", color: "var(--text)" }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,76,0,0.45)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,76,0,0.08)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border-strong)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <div className="flex gap-1.5">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  newColor === c ? "border-[var(--text)] scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={addTag}
            disabled={loading || !newName.trim()}
            className="btn-primary disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Dodaj
          </button>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="text-sm font-medium mb-3">
          Tagi workspace&apos;u ({tags.length})
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <div className="text-sm text-[var(--muted)]">Brak tagów.</div>
          ) : (
            tags.map((t) => (
              <div
                key={t.id}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: t.color + "20", color: t.color }}
              >
                <span>{t.name}</span>
                <button
                  onClick={() => deleteTag(t.id)}
                  className="opacity-40 group-hover:opacity-100 transition-all"
                  style={{ color: "var(--danger)" }}
                  title="Usuń tag"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
