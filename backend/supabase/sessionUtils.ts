
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique session ID for tracking anonymous user sessions
 * @returns {string} A UUID v4 string
 */
export function generateSessionId(): string {
  return uuidv4();
}

/**
 * Retrieves an existing session ID from localStorage or creates a new one
 * @returns {string} The session ID
 */
export function getOrCreateSessionId(): string {
  const storageKey = 'outfit_insight_session_id';
  
  // Only access localStorage in browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    let sessionId = localStorage.getItem(storageKey);
    
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem(storageKey, sessionId);
    }
    
    return sessionId;
  }
  
  // Fallback for server environment
  return generateSessionId();
}
