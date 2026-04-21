-- Seed: workspace BeautyRise + pipeline z 5 etapami
-- Wklej w Supabase SQL Editor i kliknij Run

INSERT INTO workspaces (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'BeautyRise', 'beautyrise')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO pipelines (id, workspace_id, name)
VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Główny pipeline')
ON CONFLICT DO NOTHING;

INSERT INTO pipeline_stages (id, pipeline_id, name, color, "order") VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'Nowy',       '#7c5cff', 0),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'Kontakt',    '#3b82f6', 1),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'Spotkanie',  '#f59e0b', 2),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', 'Wygrany',    '#22c55e', 3),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', 'Przegrany',  '#ef4444', 4)
ON CONFLICT DO NOTHING;

-- 3 testowe leady
INSERT INTO leads (workspace_id, full_name, phone, email, source, stage_id) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Anna Kowalska',   '+48 600 111 222', 'anna@example.com',  'meta_ads', '00000000-0000-0000-0000-000000000010'),
  ('00000000-0000-0000-0000-000000000001', 'Maria Nowak',     '+48 601 333 444', 'maria@example.com', 'manual',   '00000000-0000-0000-0000-000000000011'),
  ('00000000-0000-0000-0000-000000000001', 'Karolina Wiśniewska', '+48 602 555 666', null,             'meta_ads', '00000000-0000-0000-0000-000000000012');
