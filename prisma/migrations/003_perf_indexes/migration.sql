-- Composite & covering indexes for production hot paths

-- Lead: admin export orders by createdAt desc, often filtered by status
CREATE INDEX IF NOT EXISTS "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt" DESC);
-- Lead: dedup lookup by identity hash (SHA-256)
CREATE INDEX IF NOT EXISTS "Lead_identity_idx" ON "Lead"("identity");

-- SessionEvent: per-session timeline scan
CREATE INDEX IF NOT EXISTS "SessionEvent_sessionId_timestamp_idx" ON "SessionEvent"("sessionId", "timestamp" DESC);

-- NarrativeGeneration: dedup cache lookup (session, stage, isFallback) with LRU
CREATE INDEX IF NOT EXISTS "NarrativeGeneration_sessionId_stage_isFallback_createdAt_idx"
  ON "NarrativeGeneration"("sessionId", "stage", "isFallback", "createdAt" DESC);
