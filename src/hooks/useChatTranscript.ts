
import { useState, useEffect } from 'react';
import { getOrCreateSessionId } from '../../backend/supabase/sessionUtils';
import { saveTranscript } from '../../backend/api/transcriptService';
import type { ChatTranscript } from '../../backend/supabase/supabaseClient';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook for managing chat transcript saving functionality
 * @returns Object containing session ID and methods for saving transcripts
 */
export function useChatTranscript() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize session ID on component mount
    setSessionId(getOrCreateSessionId());
  }, []);

  /**
   * Save a chat transcript to the database
   * @param content The transcript text to save
   * @param metadata Additional metadata about the conversation
   */
  const saveChat = async (content: string, metadata: Record<string, any> = {}) => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use Edge Function for authenticated access
      const response = await supabase.functions.invoke('save-transcript', {
        body: {
          session_id: sessionId,
          transcript_text: content,
          metadata
        }
      });
      
      if (response.error) {
        console.error('Error saving transcript:', response.error);
        setError(response.error.message || 'Failed to save transcript');
      }
    } catch (err) {
      console.error('Exception saving transcript:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sessionId,
    saveChat,
    isLoading,
    error
  };
}
