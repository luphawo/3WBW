import { alerts as initialAlerts } from './data'
import type { Alert } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_alerts'
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

function loadAlerts(): Alert[] {
  if (!isBrowser()) return [...initialAlerts]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Alert[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...initialAlerts]
}

function saveAlerts(alerts: Alert[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts))
  } catch { /* ignore */ }
}

export function getAlerts(): Alert[] {
  return loadAlerts()
}

export async function seedAlertsFromSupabase(): Promise<void> {
  await syncTable<Alert>('alerts', STORAGE_KEY, initialAlerts)
  notify()
}

export async function addAlert(alert: Alert): Promise<void> {
  const list = loadAlerts()
  list.unshift(alert)
  saveAlerts(list)
  if (isSupabaseConfigured) await supabaseAdd('alerts', alert)
  notify()
}

export async function updateAlert(id: string, updates: Partial<Alert>): Promise<void> {
  const list = loadAlerts()
  const idx = list.findIndex((a) => a.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveAlerts(list)
    if (isSupabaseConfigured) await supabaseUpdate('alerts', id, updates)
    notify()
  }
}

export async function toggleAlert(id: string): Promise<void> {
  const list = loadAlerts()
  const idx = list.findIndex((a) => a.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], active: !list[idx].active }
    saveAlerts(list)
    if (isSupabaseConfigured) await supabaseUpdate('alerts', id, { active: list[idx].active })
    notify()
  }
}

export async function deleteAlert(id: string): Promise<void> {
  const list = loadAlerts().filter((a) => a.id !== id)
  saveAlerts(list)
  if (isSupabaseConfigured) await supabaseDelete('alerts', id)
  notify()
}
