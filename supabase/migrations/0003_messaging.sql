-- ─── Messaging: Messenger + Instagram DM ─────────────────────────────────────

CREATE TYPE "public"."conversation_channel" AS ENUM('messenger', 'instagram');
CREATE TYPE "public"."message_direction" AS ENUM('inbound', 'outbound');

ALTER TYPE "public"."lead_event_type" ADD VALUE IF NOT EXISTS 'message_received';
ALTER TYPE "public"."lead_event_type" ADD VALUE IF NOT EXISTS 'message_sent';

-- ─── Conversations ─────────────────────────────────────────────────────────────

CREATE TABLE "conversations" (
  "id"                   uuid        PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "workspace_id"         uuid        NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "channel"              conversation_channel NOT NULL,
  "sender_psid"          text        NOT NULL,
  "page_id"              text        NOT NULL,
  "sender_name"          text,
  "sender_profile_pic"   text,
  "lead_id"              uuid        REFERENCES leads(id) ON DELETE SET NULL,
  "last_message_at"      timestamp   DEFAULT now() NOT NULL,
  "last_message_preview" text,
  "unread_count"         integer     DEFAULT 0 NOT NULL,
  "created_at"           timestamp   DEFAULT now() NOT NULL,
  "updated_at"           timestamp   DEFAULT now() NOT NULL
);

-- ─── Messages ──────────────────────────────────────────────────────────────────

CREATE TABLE "messages" (
  "id"               uuid            PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "conversation_id"  uuid            NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  "workspace_id"     uuid            NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  "meta_message_id"  text            NOT NULL,
  "direction"        message_direction NOT NULL,
  "text"             text,
  "attachments"      jsonb           DEFAULT '[]'::jsonb,
  "sent_by_user_id"  uuid,
  "created_at"       timestamp       DEFAULT now() NOT NULL
);

-- ─── Indexes ───────────────────────────────────────────────────────────────────

-- Unique conversation per sender+page+workspace (used for upsert logic)
CREATE UNIQUE INDEX conversations_workspace_psid_page_idx
  ON conversations(workspace_id, sender_psid, page_id);

-- Fast list ordered by recency
CREATE INDEX conversations_workspace_last_msg_idx
  ON conversations(workspace_id, last_message_at DESC);

-- Fast message history per conversation
CREATE INDEX messages_conversation_created_idx
  ON messages(conversation_id, created_at ASC);

-- Idempotency: one row per Meta message_id
CREATE UNIQUE INDEX messages_meta_message_id_idx
  ON messages(meta_message_id);
