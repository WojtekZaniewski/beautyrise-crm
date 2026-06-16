-- FOS Extensions: Decisions, Waiting For, Daily Notes

CREATE TABLE "fos_decisions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "author_label" text,
  "title" text NOT NULL,
  "description" text,
  "decided_at" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "fos_waiting_for" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "from_label" text NOT NULL,
  "for_label" text NOT NULL,
  "description" text NOT NULL,
  "resolved" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "fos_daily_notes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "owner_label" text NOT NULL,
  "date" text NOT NULL,
  "content" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  UNIQUE("workspace_id", "owner_label", "date")
);

CREATE INDEX ON "fos_decisions"("workspace_id");
CREATE INDEX ON "fos_waiting_for"("workspace_id");
CREATE INDEX ON "fos_daily_notes"("workspace_id", "date");
