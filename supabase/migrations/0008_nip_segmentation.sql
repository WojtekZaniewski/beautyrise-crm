-- ─── NIP + segmentacja dofinansowań ──────────────────────────────────────────

ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "nip" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "dofinansowanie_typ" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "dofinansowanie_obsluga" text;
