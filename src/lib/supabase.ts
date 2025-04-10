
import { createClient } from '@supabase/supabase-js';

// For Vite projects, we need to use import.meta.env for environment variables
// Replace these placeholder values with your actual Supabase URL and anon key
const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_URL.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
