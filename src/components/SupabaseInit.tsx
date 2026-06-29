'use client'

import { useEffect } from 'react'
import { seedAlertsFromSupabase } from '@/lib/alert-store'
import { seedArticlesFromSupabase } from '@/lib/article-store'
import { seedIncidentsFromSupabase } from '@/lib/incident-store'
import { seedNoticesFromSupabase } from '@/lib/notice-store'
import { seedLevyMonthsFromSupabase } from '@/lib/levy-store'
import { seedResidentsFromSupabase } from '@/lib/resident-store'
import { seedMediaFromSupabase } from '@/lib/media-store'
import { isSupabaseConfigured } from '@/lib/supabase-store'

export function SupabaseInit() {
  useEffect(() => {
    if (!isSupabaseConfigured) return
    const init = async () => {
      await Promise.all([
        seedAlertsFromSupabase(),
        seedArticlesFromSupabase(),
        seedIncidentsFromSupabase(),
        seedNoticesFromSupabase(),
        seedLevyMonthsFromSupabase(),
        seedResidentsFromSupabase(),
        seedMediaFromSupabase(),
      ])
    }
    init()
  }, [])
  return null
}
