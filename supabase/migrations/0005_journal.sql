CREATE TABLE IF NOT EXISTS "journal_notes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "user_id" uuid NOT NULL,
  "date" date NOT NULL,
  "content" text NOT NULL DEFAULT '',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  UNIQUE("workspace_id", "user_id", "date")
);

CREATE TABLE IF NOT EXISTS "todo_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "user_id" uuid NOT NULL,
  "date" date NOT NULL,
  "text" text NOT NULL,
  "completed" boolean NOT NULL DEFAULT false,
  "completed_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS journal_notes_user_date_idx ON journal_notes(workspace_id, user_id, date DESC);
CREATE INDEX IF NOT EXISTS todo_items_user_date_idx ON todo_items(workspace_id, user_id, date DESC);
