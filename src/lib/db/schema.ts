import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  pgEnum,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const leadSourceEnum = pgEnum("lead_source", [
  "manual",
  "import",
  "meta_ads",
  "webhook",
  "sms",
  "email",
]);

export const leadEventTypeEnum = pgEnum("lead_event_type", [
  "created",
  "stage_change",
  "note",
  "call",
  "sms_sent",
  "email_sent",
  "meta_form_submitted",
  "message_received",
  "message_sent",
]);

export const conversationChannelEnum = pgEnum("conversation_channel", [
  "messenger",
  "instagram",
]);

export const messageDirectionEnum = pgEnum("message_direction", [
  "inbound",
  "outbound",
]);

export const integrationTypeEnum = pgEnum("integration_type", [
  "meta_ads",
  "sms_gateway",
  "email",
]);

export const workspaceMemberRoleEnum = pgEnum("workspace_member_role", [
  "owner",
  "admin",
  "member",
]);

// ─── Workspaces ───────────────────────────────────────────────────────────────

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Workspace members ────────────────────────────────────────────────────────

export const workspaceMembers = pgTable("workspace_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull(),
  role: workspaceMemberRoleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Pipelines & Stages ───────────────────────────────────────────────────────

export const pipelines = pgTable("pipelines", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pipelineStages = pgTable("pipeline_stages", {
  id: uuid("id").primaryKey().defaultRandom(),
  pipelineId: uuid("pipeline_id")
    .notNull()
    .references(() => pipelines.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#7c5cff"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Leads ────────────────────────────────────────────────────────────────────

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  email: text("email"),
  source: leadSourceEnum("source").notNull().default("manual"),
  sourceCampaignId: uuid("source_campaign_id"),
  stageId: uuid("stage_id").references(() => pipelineStages.id, {
    onDelete: "set null",
  }),
  ownerId: uuid("owner_id"),
  valuePln: numeric("value_pln", { precision: 10, scale: 2 }),
  notes: text("notes"),
  customFields: jsonb("custom_fields").default({}),
  archived: boolean("archived").notNull().default(false),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Lead Events (timeline) ───────────────────────────────────────────────────

export const leadEvents = pgTable("lead_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  type: leadEventTypeEnum("type").notNull(),
  payload: jsonb("payload").default({}),
  actorId: uuid("actor_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#8b8d9a"),
});

export const leadTags = pgTable("lead_tags", {
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
});

// ─── Integrations ─────────────────────────────────────────────────────────────

export const integrations = pgTable("integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  type: integrationTypeEnum("type").notNull(),
  credentials: jsonb("credentials").default({}),
  status: text("status").notNull().default("disconnected"),
  connectedAt: timestamp("connected_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Campaigns (cache z Meta) ─────────────────────────────────────────────────

export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  externalId: text("external_id").notNull(),
  platform: text("platform").notNull().default("meta"),
  name: text("name").notNull(),
  objective: text("objective"),
  status: text("status"),
  dailyBudget: numeric("daily_budget", { precision: 10, scale: 2 }),
  syncedAt: timestamp("synced_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Campaign Metrics (daily snapshots) ──────────────────────────────────────

export const campaignMetricsDaily = pgTable("campaign_metrics_daily", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  date: text("date").notNull(), // YYYY-MM-DD
  spend: numeric("spend", { precision: 10, scale: 2 }),
  impressions: integer("impressions"),
  clicks: integer("clicks"),
  leadsCount: integer("leads_count"),
  cpc: numeric("cpc", { precision: 10, scale: 4 }),
  cpl: numeric("cpl", { precision: 10, scale: 4 }),
  ctr: numeric("ctr", { precision: 10, scale: 4 }),
  conversionRate: numeric("conversion_rate", { precision: 10, scale: 4 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Future modules (tables only, no UI yet) ─────────────────────────────────

export const smsMessages = pgTable("sms_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  to: text("to").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("pending"),
  externalId: text("external_id"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailMessages = pgTable("email_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  to: text("to").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("pending"),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const automations = pgTable("automations", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull(),
  name: text("name").notNull(),
  triggerType: text("trigger_type").notNull(),
  triggerConfig: jsonb("trigger_config").default({}),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const automationSteps = pgTable("automation_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  automationId: uuid("automation_id")
    .notNull()
    .references(() => automations.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  type: text("type").notNull(),
  config: jsonb("config").default({}),
});

// ─── Messaging (Messenger + Instagram DM) ────────────────────────────────────

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  channel: conversationChannelEnum("channel").notNull(),
  senderPsid: text("sender_psid").notNull(),
  pageId: text("page_id").notNull(),
  senderName: text("sender_name"),
  senderProfilePic: text("sender_profile_pic"),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  lastMessagePreview: text("last_message_preview"),
  unreadCount: integer("unread_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  metaMessageId: text("meta_message_id").notNull(),
  direction: messageDirectionEnum("direction").notNull(),
  text: text("text"),
  attachments: jsonb("attachments").default([]),
  sentByUserId: uuid("sent_by_user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamMessages = pgTable("team_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull(),
  userEmail: text("user_email"),
  userName: text("user_name"),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  members: many(workspaceMembers),
  pipelines: many(pipelines),
  leads: many(leads),
  integrations: many(integrations),
  campaigns: many(campaigns),
  tags: many(tags),
  conversations: many(conversations),
  teamMessages: many(teamMessages),
}));

export const pipelinesRelations = relations(pipelines, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [pipelines.workspaceId],
    references: [workspaces.id],
  }),
  stages: many(pipelineStages),
}));

export const pipelineStagesRelations = relations(
  pipelineStages,
  ({ one, many }) => ({
    pipeline: one(pipelines, {
      fields: [pipelineStages.pipelineId],
      references: [pipelines.id],
    }),
    leads: many(leads),
  }),
);

export const leadsRelations = relations(leads, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [leads.workspaceId],
    references: [workspaces.id],
  }),
  stage: one(pipelineStages, {
    fields: [leads.stageId],
    references: [pipelineStages.id],
  }),
  events: many(leadEvents),
  tags: many(leadTags),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [campaigns.workspaceId],
    references: [workspaces.id],
  }),
  metrics: many(campaignMetricsDaily),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [conversations.workspaceId],
    references: [workspaces.id],
  }),
  lead: one(leads, {
    fields: [conversations.leadId],
    references: [leads.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  workspace: one(workspaces, {
    fields: [messages.workspaceId],
    references: [workspaces.id],
  }),
}));

// ─── FOS Enums ────────────────────────────────────────────────────────────────

export const fosSprintStatusEnum = pgEnum("fos_sprint_status", ["active", "completed", "archived"]);
export const fosPriorityStatusEnum = pgEnum("fos_priority_status", ["not_started", "in_progress", "completed", "blocked"]);
export const fosIdeaStatusEnum = pgEnum("fos_idea_status", ["backlog", "under_review", "approved", "rejected"]);

// ─── FOS Tables ───────────────────────────────────────────────────────────────

export const fosSprints = pgTable("fos_sprints", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  goal: text("goal").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  status: fosSprintStatusEnum("status").notNull().default("active"),
  completionPct: integer("completion_pct").notNull().default(0),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fosSprintGoalHistory = pgTable("fos_sprint_goal_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  sprintId: uuid("sprint_id").notNull().references(() => fosSprints.id, { onDelete: "cascade" }),
  oldGoal: text("old_goal").notNull(),
  newGoal: text("new_goal").notNull(),
  changedBy: uuid("changed_by"),
  changedAt: timestamp("changed_at").defaultNow().notNull(),
});

export const fosWeeklyPriorities = pgTable("fos_weekly_priorities", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  sprintId: uuid("sprint_id").references(() => fosSprints.id, { onDelete: "set null" }),
  weekStart: text("week_start").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  ownerId: uuid("owner_id"),
  ownerLabel: text("owner_label"),
  deadline: text("deadline"),
  status: fosPriorityStatusEnum("status").notNull().default("not_started"),
  isCompanyGoal: boolean("is_company_goal").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fosWeeklyReviews = pgTable("fos_weekly_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull(),
  userLabel: text("user_label"),
  weekStart: text("week_start").notNull(),
  doneThisWeek: text("done_this_week"),
  notDone: text("not_done"),
  blockers: text("blockers"),
  focusNextWeek: text("focus_next_week"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fosIdeas = pgTable("fos_ideas", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  authorId: uuid("author_id"),
  authorLabel: text("author_label"),
  title: text("title").notNull(),
  description: text("description"),
  status: fosIdeaStatusEnum("status").notNull().default("backlog"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
