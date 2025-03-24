
-- Create ChatTranscripts table for anonymous user data collection
CREATE TABLE public.chat_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  transcript_text TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.chat_transcripts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated inserts through Supabase Edge Functions
CREATE POLICY "Allow authenticated inserts" 
  ON public.chat_transcripts 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated reads through Supabase Edge Functions
CREATE POLICY "Allow authenticated reads" 
  ON public.chat_transcripts 
  FOR SELECT 
  TO authenticated
  USING (true);
