import { levyMonths as initialLevyMonths } from './data'
import type { LevyMonth } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_levy_months'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function loadMonths(): LevyMonth[] {
  if (!isBrowser()) return [...initialLevyMonths]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as LevyMonth[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...initialLevyMonths]
}

function saveMonths(months: LevyMonth[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(months))
  } catch { /* ignore */ }
}

export function getLevyMonths(): LevyMonth[] {
  return loadMonths()
}

export async function seedLevyMonthsFromSupabase(): Promise<void> {
  await syncTable<LevyMonth>('levy_months', STORAGE_KEY, initialLevyMonths)
}

export function addLevyMonth(month: LevyMonth): void {
  const list = loadMonths()
  list.push(month)
  saveMonths(list)
  if (isSupabaseConfigured) supabaseAdd('levy_months', month)
}

export function updateLevyMonth(id: string, updates: Partial<LevyMonth>): void {
  const list = loadMonths()
  const idx = list.findIndex((m) => m.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveMonths(list)
    if (isSupabaseConfigured) supabaseUpdate('levy_months', id, updates)
  }
}

export function deleteLevyMonth(id: string): void {
  const list = loadMonths().filter((m) => m.id !== id)
  saveMonths(list)
  if (isSupabaseConfigured) supabaseDelete('levy_months', id)
}
