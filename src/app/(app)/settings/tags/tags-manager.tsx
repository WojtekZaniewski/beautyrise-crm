"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Tag = { id: string; name: string; color: string };

const PALETTE = [
  "#ff4c00", "#3b82f6", "#22c55e", "#f59e0b",
  "#ef4444", "#ec4899", "#8b5cf6", "#14b8a6",
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
      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-5">
        <div className="text-sm font-medium mb-3">Dodaj nowy tag</div>
        <div className="flex gap-3 items-center">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            placeholder="Nazwa tagu (np. VIP)"
            className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <div className="flex gap-1.5">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setNewColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  newColor === c ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button
            onClick={addTag}
            disabled={loading || !newName.trim()}
            className="bg-[var(--accent)] hover:opacity-90 disabled:opacity-40 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Dodaj
          </button>
        </div>
      </div>

      <div className="bg-[var(--panel)] border border-[var(--border)] rounded-xl p-5">
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
                  className="opacity-40 group-hover:opacity-100 hover:text-red-400 transition-all"
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
