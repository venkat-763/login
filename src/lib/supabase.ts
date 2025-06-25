import { createClient } from '@supabase/supabase-js';

// These would be set from environment variables in a real app
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);