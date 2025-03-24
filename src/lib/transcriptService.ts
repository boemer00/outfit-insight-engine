
import { supabase } from './supabase';
import { getSessionId } from './sessionUtils';

interface TranscriptEntry {
  session_id: string;
  transcript_text: string;
  metadata?: Record<string, any>;
}

/**
 * Saves a chat transcript to Supabase
 * @param {string} text - The conversation text to save
 * @param {Object} metadata - Additional metadata about the interaction
 * @returns {Promise<{success: boolean, error?: any}>} Result of the operation
 */
export const saveTranscript = async (
  text: string, 
  metadata: Record<string, any> = {}
): Promise<{success: boolean, error?: any}> => {
  try {
    // Get the current session ID
    const sessionId = getSessionId();
    
    // Prepare the transcript entry
    const entry: TranscriptEntry = {
      session_id: sessionId,
      transcript_text: text,
      metadata
    };
    
    // Insert the entry into Supabase
    const { error } = await supabase
      .from('chat_transcripts')
      .insert(entry);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error saving transcript:', error);
    return { success: false, error };
  }
};

/**
 * Retrieves chat transcripts from Supabase with optional filtering
 * @param {Object} options - Filter options
 * @returns {Promise<{data: any[], error?: any}>} Retrieved transcripts
 */
export const getTranscripts = async (options: {
  sessionId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
} = {}): Promise<{data: any[], error?: any}> => {
  try {
    // Start building the query
    let query = supabase
      .from('chat_transcripts')
      .select('*');
    
    // Apply filters if specified
    if (options.sessionId) {
      query = query.eq('session_id', options.sessionId);
    }
    
    if (options.startDate) {
      query = query.gte('timestamp', options.startDate.toISOString());
    }
    
    if (options.endDate) {
      query = query.lte('timestamp', options.endDate.toISOString());
    }
    
    // Apply limit if specified
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    // Execute the query
    const { data, error } = await query.order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    return { data: data || [] };
  } catch (error) {
    console.error('Error fetching transcripts:', error);
    return { data: [], error };
  }
};
