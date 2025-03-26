
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

// Function to generate or retrieve a session ID
export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem('chatSessionId');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('chatSessionId', sessionId);
  }
  
  return sessionId;
};

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
      // For this demo, we'll just simulate saving to the database
      console.log('Saving transcript:', { 
        session_id: sessionId,
        transcript_text: content,
        metadata 
      });
      
      // In a real app, this would call a Supabase function or API
      // Simulating a successful save after a short delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
