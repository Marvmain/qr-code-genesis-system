
import { createClient } from '@supabase/supabase-js';

// Using your actual Supabase project URL
const supabaseUrl = 'https://cartoxjguhfndegmqqrv.supabase.co';
// You need to replace this with your actual anon key from the Supabase dashboard
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
