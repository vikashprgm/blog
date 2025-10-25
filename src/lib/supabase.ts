import { createClient } from '@supabase/supabase-js';

// Get your Supabase URL and Anon Key from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Anon Key is missing from .env file");
}

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseKey);