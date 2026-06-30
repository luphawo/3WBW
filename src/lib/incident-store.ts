import { incidents as initialIncidents } from './data'
import type { Incident } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_incidents'
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

function loadIncidents(): Incident[] {
  if (!isBrowser()) return [...initialIncidents]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Incident[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...initialIncidents]
}

function saveIncidents(incidents: Incident[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents))
  } catch { /* ignore */ }
}

export function getIncidents(): Incident[] {
  return loadIncidents()
}

export async function seedIncidentsFromSupabase(): Promise<void> {
  await syncTable<Incident>('incidents', STORAGE_KEY, initialIncidents)
  notify()
}

export async function addIncident(incident: Incident): Promise<void> {
  const list = loadIncidents()
  list.unshift(incident)
  saveIncidents(list)
  if (isSupabaseConfigured) await supabaseAdd('incidents', incident)
  notify()
}

export async function updateIncident(id: string, updates: Partial<Incident>): Promise<void> {
  const list = loadIncidents()
  const idx = list.findIndex((i) => i.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveIncidents(list)
    if (isSupabaseConfigured) await supabaseUpdate('incidents', id, updates)
    notify()
  }
}

export async function deleteIncident(id: string): Promise<void> {
  const list = loadIncidents().filter((i) => i.id !== id)
  saveIncidents(list)
  if (isSupabaseConfigured) await supabaseDelete('incidents', id)
  notify()
}
