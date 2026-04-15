-- Align lead table with API payload field names in a drift-safe way.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Lead'
      AND column_name = 'email'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Lead'
      AND column_name = 'workEmail'
  ) THEN
    ALTER TABLE "Lead" RENAME COLUMN "email" TO "workEmail";
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Lead'
      AND column_name = 'action'
  ) THEN
    ALTER TABLE "Lead" ADD COLUMN "action" VARCHAR(64) NOT NULL DEFAULT 'pilot';
    ALTER TABLE "Lead" ALTER COLUMN "action" DROP DEFAULT;
  END IF;
END $$;

DROP INDEX IF EXISTS "Lead_email_idx";
CREATE INDEX IF NOT EXISTS "Lead_workEmail_idx" ON "Lead"("workEmail");
