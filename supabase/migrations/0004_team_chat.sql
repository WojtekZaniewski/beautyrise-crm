-- Team chat within each workspace
CREATE TABLE IF NOT EXISTS "team_messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "user_id" uuid NOT NULL,
  "user_email" text,
  "user_name" text,
  "text" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS team_messages_workspace_created_idx
  ON team_messages(workspace_id, created_at ASC);
