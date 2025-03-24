
import { createClient } from '@supabase/supabase-js';

// For local development, you can use these values
// In production, these should be set as environment variables
const supabaseUrl = 'https://tmxwjgkplcubaqyvunmw.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'your-public-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
