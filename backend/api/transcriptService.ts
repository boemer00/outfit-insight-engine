
import { supabase } from '../supabase/supabaseClient';
import type { ChatTranscript } from '../supabase/supabaseClient';

/**
 * Saves a chat transcript to the database
 * @param {ChatTranscript} transcript - The transcript data to save
 * @returns {Promise<{ success: boolean; error?: any; data?: any }>} Result of the operation
 */
export async function saveTranscript(transcript: ChatTranscript): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    const { data, error } = await supabase
      .from('chat_transcripts')
      .insert([transcript]);
    
    if (error) {
      console.error('Error saving transcript:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Exception saving transcript:', error);
    return { success: false, error };
  }
}

/**
 * Retrieves chat transcripts filtered by session ID
 * @param {string} sessionId - The session ID to filter by
 * @returns {Promise<{ transcripts?: ChatTranscript[]; error?: any }>} The retrieved transcripts or error
 */
export async function getTranscriptsBySession(sessionId: string): Promise<{ transcripts?: ChatTranscript[]; error?: any }> {
  try {
    const { data, error } = await supabase
      .from('chat_transcripts')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error retrieving transcripts:', error);
      return { error };
    }
    
    return { transcripts: data as ChatTranscript[] };
  } catch (error) {
    console.error('Exception retrieving transcripts:', error);
    return { error };
  }
}

/**
 * Retrieves all chat transcripts with optional time filtering
 * @param {Object} options - Filter options
 * @param {string} [options.startDate] - Optional start date for filtering
 * @param {string} [options.endDate] - Optional end date for filtering
 * @returns {Promise<{ transcripts?: ChatTranscript[]; error?: any }>} The retrieved transcripts or error
 */
export async function getAllTranscripts({ 
  startDate, 
  endDate 
}: { 
  startDate?: string; 
  endDate?: string;
} = {}): Promise<{ transcripts?: ChatTranscript[]; error?: any }> {
  try {
    let query = supabase
      .from('chat_transcripts')
      .select('*');
    
    if (startDate) {
      query = query.gte('timestamp', startDate);
    }
    
    if (endDate) {
      query = query.lte('timestamp', endDate);
    }
    
    const { data, error } = await query.order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error retrieving all transcripts:', error);
      return { error };
    }
    
    return { transcripts: data as ChatTranscript[] };
  } catch (error) {
    console.error('Exception retrieving all transcripts:', error);
    return { error };
  }
}
