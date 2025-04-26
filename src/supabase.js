import { createClient } from '@supabase/supabase-js'

const SBURL = import.meta.env.VITE_SB_URL
const SBKEY = import.meta.env.VITE_SB_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(SBURL, SBKEY)