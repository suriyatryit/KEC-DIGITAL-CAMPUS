import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && !supabaseUrl.includes('your-project-id');

if (!isConfigured) {
  console.error('Supabase is not configured! Check your .env file.');
}

// Initialize client only if URL is present to avoid library crashes
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : { auth: { getSession: async () => ({ data: { session: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) }, from: () => ({ select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }) }) };
