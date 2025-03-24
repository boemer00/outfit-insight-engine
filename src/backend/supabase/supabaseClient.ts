
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../src/integrations/supabase/types';

// Use existing Supabase client to maintain consistency
import { supabase as existingClient } from '@/integrations/supabase/client';

// Re-export the existing client to maintain a consistent API
export const supabase = existingClient;

// Types for chat transcript data
export type ChatTranscript = {
  id?: string;
  session_id: string;
  transcript_text: string;
  timestamp?: string;
  metadata?: Record<string, any>;
};
