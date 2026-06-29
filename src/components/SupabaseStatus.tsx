'use client'

import { useState, useEffect } from 'react'
import { isSupabaseConfigured, forcePushTable } from '@/lib/supabase-store'
import { supabase } from '@/lib/supabase'
import { alerts } from '@/lib/data'
import { incidents } from '@/lib/data'
import { notices } from '@/lib/data'
import { levyMonths } from '@/lib/data'
import { residents } from '@/lib/data'
import { articles } from '@/lib/data'

const STORES = [
  { label: 'Alerts', table: 'alerts', key: '3wbw_alerts', initial: alerts },
  { label: 'Articles', table: 'articles', key: '3wbw_articles', initial: articles },
  { label: 'Incidents', table: 'incidents', key: '3wbw_incidents', initial: incidents },
  { label: 'Notices', table: 'notices', key: '3wbw_notices', initial: notices },
  { label: 'Levy Months', table: 'levy_months', key: '3wbw_levy_months', initial: levyMonths },
  { label: 'Residents', table: 'residents', key: '3wbw_residents', initial: residents },
] as const

export function SupabaseStatus() {
  const [results, setResults] = useState<{ label: string; status: string }[]>([])
  const [pushing, setPushing] = useState(false)
  const [diag, setDiag] = useState<string[]>([])

  useEffect(() => {
    try {
      const out: string[] = []
      out.push(`supabase: ${supabase ? 'created' : 'null'}`)
      if (supabase) {
        const url = (supabase as any).supabaseUrl || '?'
        out.push(`url: ${url}`)
        supabase.from('alerts').select('*', { count: 'exact', head: true }).then((r) => {
          setDiag((d) => [...d, `test: count=${r.count}, err=${r.error ? r.error.message : 'none'}`])
        })
      }
      setDiag(out)
    } catch (e: any) {
      setDiag([`err: ${e?.message || e}`])
    }
  }, [])

  async function handlePushAll() {
    setPushing(true)
    setResults([])
    const out: { label: string; status: string }[] = []
    for (const store of STORES) {
      const err = await forcePushTable(store.table, store.key, store.initial as any[])
      out.push({ label: store.label, status: err ? `Error: ${err}` : 'OK' })
    }
    setResults(out)
    setPushing(false)
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
        Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable data sharing.
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-sm font-medium">Supabase connected</span>
      </div>
      <div className="mb-4 p-3 rounded-lg bg-surface-alt border border-border font-mono text-xs space-y-1">
        {diag.map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <p className="text-xs text-text-secondary mb-4">
        Data syncs automatically on each page load. Click below to force a full push of all data.
      </p>
      <button
        onClick={handlePushAll}
        disabled={pushing}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-dark disabled:opacity-50"
      >
        {pushing ? 'Pushing...' : 'Push All Data to Supabase'}
      </button>
      {results.length > 0 && (
        <div className="mt-4 space-y-1">
          {results.map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-xs">
              <span className={r.status === 'OK' ? 'text-green-600' : 'text-red-600'}>
                {r.status === 'OK' ? '✓' : '✗'}
              </span>
              <span className="font-medium">{r.label}:</span>
              <span className={r.status === 'OK' ? 'text-green-600' : 'text-red-600'}>{r.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
