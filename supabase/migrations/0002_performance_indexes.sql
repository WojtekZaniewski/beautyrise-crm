-- Performance indexes for multi-tenant workloads.
-- Run in Supabase SQL Editor.

-- Lead queries on leads list, kanban, dashboard: workspace + archived + stage + created_at
CREATE INDEX IF NOT EXISTS leads_workspace_created_idx
  ON leads(workspace_id, created_at DESC)
  WHERE archived = false;

CREATE INDEX IF NOT EXISTS leads_workspace_source_idx
  ON leads(workspace_id, source)
  WHERE archived = false;

-- Dashboard + campaigns filter leads by stage_id
CREATE INDEX IF NOT EXISTS leads_stage_idx
  ON leads(stage_id)
  WHERE archived = false;

-- Pipelines are filtered by workspace constantly
CREATE INDEX IF NOT EXISTS pipelines_workspace_idx
  ON pipelines(workspace_id, created_at);

-- Stages always filtered/joined by pipeline_id
CREATE INDEX IF NOT EXISTS pipeline_stages_pipeline_order_idx
  ON pipeline_stages(pipeline_id, "order");

-- Webhook looks up campaigns by external_id globally
CREATE INDEX IF NOT EXISTS campaigns_external_idx
  ON campaigns(external_id);

-- Campaign metrics aggregation by date range
CREATE INDEX IF NOT EXISTS campaign_metrics_date_idx
  ON campaign_metrics_daily(date DESC);

-- Tags filtered by workspace
CREATE INDEX IF NOT EXISTS tags_workspace_idx
  ON tags(workspace_id, name);

-- Lead events timeline per lead
CREATE INDEX IF NOT EXISTS lead_events_lead_created_idx
  ON lead_events(lead_id, created_at DESC);

-- Integrations lookup by workspace + type (already unique from 0001)
-- Indexed by: integrations_workspace_type_idx
