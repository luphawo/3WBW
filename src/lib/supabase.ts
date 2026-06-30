import { createClient } from '@supabase/supabase-js'

let rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Strip /rest/v1 if already present (SDK appends it internally)
if (rawUrl && rawUrl.includes('/rest/v1')) {
  rawUrl = rawUrl.replace(/\/rest\/v1\/?$/, '')
}

export const supabaseUrl = rawUrl
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null

export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}
