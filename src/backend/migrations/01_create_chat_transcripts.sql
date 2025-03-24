
-- Create chat_transcripts table
CREATE TABLE IF NOT EXISTS chat_transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  transcript_text TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on session_id for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_transcripts_session_id ON chat_transcripts (session_id);

-- Create index on timestamp for chronological queries
CREATE INDEX IF NOT EXISTS idx_chat_transcripts_timestamp ON chat_transcripts (timestamp);
