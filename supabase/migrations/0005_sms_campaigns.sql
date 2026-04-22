-- ─── SMS Campaigns & Conversations ───────────────────────────────────────────

-- Add sms_received to lead_event_type enum
ALTER TYPE "public"."lead_event_type" ADD VALUE IF NOT EXISTS 'sms_received';

-- ─── sms_campaigns ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "sms_campaigns" (
  "id"           uuid      PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid      NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "name"         text      NOT NULL DEFAULT '',
  "template"     text      NOT NULL DEFAULT '',
  "status"       text      NOT NULL DEFAULT 'sent',
  "total_sent"   integer   NOT NULL DEFAULT 0,
  "created_at"   timestamp NOT NULL DEFAULT now()
);

-- ─── sms_conversations ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "sms_conversations" (
  "id"                   uuid      PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id"         uuid      NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "campaign_id"          uuid      REFERENCES sms_campaigns(id) ON DELETE SET NULL,
  "lead_id"              uuid      REFERENCES leads(id) ON DELETE SET NULL,
  "phone"                text      NOT NULL,
  "last_message_at"      timestamp NOT NULL DEFAULT now(),
  "last_message_preview" text,
  "unread_count"         integer   NOT NULL DEFAULT 0,
  "created_at"           timestamp NOT NULL DEFAULT now(),
  CONSTRAINT sms_conversations_workspace_phone_unique UNIQUE (workspace_id, phone)
);

-- ─── sms_campaign_recipients ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "sms_campaign_recipients" (
  "id"           uuid      PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id" uuid      NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "campaign_id"  uuid      NOT NULL REFERENCES sms_campaigns(id) ON DELETE CASCADE,
  "lead_id"      uuid      REFERENCES leads(id) ON DELETE SET NULL,
  "phone"        text      NOT NULL,
  "name"         text      DEFAULT '',
  "message_body" text      DEFAULT '',
  "status"       text      NOT NULL DEFAULT 'sent',
  "replied_at"   timestamp,
  "sent_at"      timestamp,
  "created_at"   timestamp NOT NULL DEFAULT now()
);

-- ─── Alter sms_messages ───────────────────────────────────────────────────────

ALTER TABLE "sms_messages" ADD COLUMN IF NOT EXISTS "direction"       text NOT NULL DEFAULT 'outbound';
ALTER TABLE "sms_messages" ADD COLUMN IF NOT EXISTS "campaign_id"     uuid REFERENCES sms_campaigns(id) ON DELETE SET NULL;
ALTER TABLE "sms_messages" ADD COLUMN IF NOT EXISTS "conversation_id" uuid REFERENCES sms_conversations(id) ON DELETE SET NULL;

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS sms_conversations_workspace_time_idx  ON sms_conversations(workspace_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS sms_conversations_campaign_idx        ON sms_conversations(campaign_id);
CREATE INDEX IF NOT EXISTS sms_campaign_recipients_campaign_idx  ON sms_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS sms_messages_conversation_time_idx    ON sms_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS sms_messages_campaign_idx             ON sms_messages(campaign_id);
