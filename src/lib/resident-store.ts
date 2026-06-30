import { residents as initialResidents } from './data'
import type { Resident } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_residents'
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

function loadResidents(): Resident[] {
  if (!isBrowser()) return [...initialResidents]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Resident[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...initialResidents]
}

function saveResidents(residents: Resident[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(residents))
  } catch { /* ignore */ }
}

export function getResidents(): Resident[] {
  return loadResidents()
}

export function getResident(id: string): Resident | undefined {
  return loadResidents().find((r) => r.id === id)
}

export async function seedResidentsFromSupabase(): Promise<void> {
  await syncTable<Resident>('residents', STORAGE_KEY, initialResidents)
  notify()
}

export async function addResident(resident: Resident): Promise<void> {
  const list = loadResidents()
  list.push(resident)
  saveResidents(list)
  if (isSupabaseConfigured) await supabaseAdd('residents', resident)
  notify()
}

export async function updateResident(id: string, updates: Partial<Resident>): Promise<void> {
  const list = loadResidents()
  const idx = list.findIndex((r) => r.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveResidents(list)
    if (isSupabaseConfigured) await supabaseUpdate('residents', id, updates)
    notify()
  }
}

export async function deleteResident(id: string): Promise<void> {
  const list = loadResidents().filter((r) => r.id !== id)
  saveResidents(list)
  if (isSupabaseConfigured) await supabaseDelete('residents', id)
  notify()
}
