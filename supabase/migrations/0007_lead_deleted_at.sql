-- Add deleted_at to track when a lead was moved to trash
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
