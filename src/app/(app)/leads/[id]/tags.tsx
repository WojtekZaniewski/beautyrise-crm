"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Tag = { id: string; name: string; color: string };

export function LeadTags({
  leadId,
  allTags,
  assignedIds,
}: {
  leadId: string;
  allTags: Tag[];
  assignedIds: string[];
}) {
  const supabase = createClient();
  const router = useRouter();
  const [assigned, setAssigned] = useState(new Set(assignedIds));
  const [open, setOpen] = useState(false);

  async function toggle(tagId: string) {
    const next = new Set(assigned);
    if (next.has(tagId)) {
      next.delete(tagId);
      await supabase
        .from("lead_tags")
        .delete()
        .eq("lead_id", leadId)
        .eq("tag_id", tagId);
    } else {
      next.add(tagId);
      await supabase.from("lead_tags").insert({ lead_id: leadId, tag_id: tagId });
    }
    setAssigned(next);
    router.refresh();
  }

  const assignedTags = allTags.filter((t) => assigned.has(t.id));
  const unassignedTags = allTags.filter((t) => !assigned.has(t.id));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {assignedTags.length === 0 ? (
          <div className="text-xs text-[var(--muted)]">Brak tagów</div>
        ) : (
          assignedTags.map((t) => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs hover:opacity-70"
              style={{ backgroundColor: t.color + "20", color: t.color }}
              title="Usuń tag"
            >
              {t.name} <span>×</span>
            </button>
          ))
        )}
      </div>

      {unassignedTags.length > 0 && (
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            {open ? "−" : "+"} dodaj tag
          </button>
          {open && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {unassignedTags.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  className="inline-flex px-2 py-0.5 rounded-full text-xs border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                  style={{ color: t.color }}
                >
                  + {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
