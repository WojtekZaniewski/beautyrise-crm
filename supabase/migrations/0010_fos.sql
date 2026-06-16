-- FOS: Founder Operating System
CREATE TYPE "fos_sprint_status" AS ENUM('active', 'completed', 'archived');
CREATE TYPE "fos_priority_status" AS ENUM('not_started', 'in_progress', 'completed', 'blocked');
CREATE TYPE "fos_idea_status" AS ENUM('backlog', 'under_review', 'approved', 'rejected');

CREATE TABLE "fos_sprints" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "goal" text NOT NULL,
  "start_date" text NOT NULL,
  "end_date" text NOT NULL,
  "status" fos_sprint_status NOT NULL DEFAULT 'active',
  "completion_pct" integer NOT NULL DEFAULT 0,
  "created_by" uuid,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "fos_sprint_goal_history" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "sprint_id" uuid NOT NULL REFERENCES "fos_sprints"("id") ON DELETE CASCADE,
  "old_goal" text NOT NULL,
  "new_goal" text NOT NULL,
  "changed_by" uuid,
  "changed_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "fos_weekly_priorities" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "sprint_id" uuid REFERENCES "fos_sprints"("id") ON DELETE SET NULL,
  "week_start" text NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "owner_id" uuid,
  "owner_label" text,
  "deadline" text,
  "status" fos_priority_status NOT NULL DEFAULT 'not_started',
  "is_company_goal" boolean NOT NULL DEFAULT false,
  "completed_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "fos_weekly_reviews" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "user_id" uuid NOT NULL,
  "user_label" text,
  "week_start" text NOT NULL,
  "done_this_week" text,
  "not_done" text,
  "blockers" text,
  "focus_next_week" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  UNIQUE("workspace_id", "user_id", "week_start")
);

CREATE TABLE "fos_ideas" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "author_id" uuid,
  "author_label" text,
  "title" text NOT NULL,
  "description" text,
  "status" fos_idea_status NOT NULL DEFAULT 'backlog',
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX ON "fos_sprints"("workspace_id");
CREATE INDEX ON "fos_weekly_priorities"("workspace_id", "week_start");
CREATE INDEX ON "fos_weekly_reviews"("workspace_id");
CREATE INDEX ON "fos_ideas"("workspace_id");
