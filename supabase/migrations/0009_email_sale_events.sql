-- Add presale and postsale email event types to lead_event_type enum
ALTER TYPE "public"."lead_event_type" ADD VALUE IF NOT EXISTS 'presale_email_sent';
ALTER TYPE "public"."lead_event_type" ADD VALUE IF NOT EXISTS 'postsale_email_sent';
