-- Add potential_score (0–10) to leads
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "potential_score" smallint
  CHECK (potential_score >= 0 AND potential_score <= 10);
