-- Extend lead_source enum with email and sms channel values
ALTER TYPE "public"."lead_source" ADD VALUE IF NOT EXISTS 'email';
ALTER TYPE "public"."lead_source" ADD VALUE IF NOT EXISTS 'sms';
