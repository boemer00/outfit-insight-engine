
import { v4 as uuidv4 } from 'uuid';

/**
 * Gets the current session ID or creates a new one
 * @returns {string} Session ID for the current user
 */
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('outfit_insight_session_id');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('outfit_insight_session_id', sessionId);
  }
  
  return sessionId;
};

/**
 * Resets the session ID to create a new session
 * @returns {string} New session ID
 */
export const resetSessionId = (): string => {
  const sessionId = uuidv4();
  localStorage.setItem('outfit_insight_session_id', sessionId);
  return sessionId;
};
