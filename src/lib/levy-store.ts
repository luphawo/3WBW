import { levyMonths as initialLevyMonths } from './data'
import type { LevyMonth } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_levy_months'
const listeners = new Set<() => void>()

export function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function notify(): void {
  for (const cb of listeners) cb()
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function loadMonths(): LevyMonth[] {
  if (!isBrowser()) return [...initialLevyMonths]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as LevyMonth[]
      if (parsed.length > 0) return parsed.sort((a, b) => a.id.localeCompare(b.id))
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
  notify()
}

export async function addLevyMonth(month: LevyMonth): Promise<void> {
  const list = loadMonths()
  list.push(month)
  saveMonths(list)
  if (isSupabaseConfigured) await supabaseAdd('levy_months', month)
  notify()
}

export async function updateLevyMonth(id: string, updates: Partial<LevyMonth>): Promise<void> {
  const list = loadMonths()
  const idx = list.findIndex((m) => m.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveMonths(list)
    if (isSupabaseConfigured) await supabaseUpdate('levy_months', id, updates)
    notify()
  }
}

export async function deleteLevyMonth(id: string): Promise<void> {
  const list = loadMonths().filter((m) => m.id !== id)
  saveMonths(list)
  if (isSupabaseConfigured) await supabaseDelete('levy_months', id)
  notify()
}
