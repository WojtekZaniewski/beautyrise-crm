CREATE UNIQUE INDEX IF NOT EXISTS campaigns_workspace_external_idx ON campaigns(workspace_id, external_id);
CREATE UNIQUE INDEX IF NOT EXISTS campaign_metrics_campaign_date_idx ON campaign_metrics_daily(campaign_id, date);
CREATE UNIQUE INDEX IF NOT EXISTS integrations_workspace_type_idx ON integrations(workspace_id, type);
CREATE INDEX IF NOT EXISTS leads_workspace_stage_idx ON leads(workspace_id, stage_id) WHERE archived = false;
CREATE INDEX IF NOT EXISTS leads_source_campaign_idx ON leads(source_campaign_id) WHERE source_campaign_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS lead_events_lead_idx ON lead_events(lead_id, created_at DESC);
