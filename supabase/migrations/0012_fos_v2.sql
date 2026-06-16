-- FOS v2: Fire Tasks, Pending Decisions, Reason on Decisions, Founder Journal

-- Fire tasks flag on priorities
ALTER TABLE "fos_weekly_priorities"
  ADD COLUMN "is_fire" boolean NOT NULL DEFAULT false;

-- Pending decisions support + reason field
ALTER TABLE "fos_decisions"
  ADD COLUMN "status" text NOT NULL DEFAULT 'decided',
  ADD COLUMN "reason" text;

CREATE INDEX ON "fos_decisions"("workspace_id", "status");

-- Founder Journal (3 questions per person per day)
CREATE TABLE "fos_founder_journal" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "author_label" text NOT NULL,
  "date" text NOT NULL,
  "went_well" text,
  "problem" text,
  "biggest_win" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  UNIQUE("workspace_id", "author_label", "date")
);

CREATE INDEX ON "fos_founder_journal"("workspace_id", "date");
