
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../src/integrations/supabase/types';

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Create and export Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Types for chat transcript data
export type ChatTranscript = {
  id?: string;
  session_id: string;
  transcript_text: string;
  timestamp?: string;
  metadata?: Record<string, any>;
};
