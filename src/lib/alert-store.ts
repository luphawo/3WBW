import { alerts as initialAlerts } from './data'
import type { Alert } from '@/types'
import { supabaseGet, supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured } from './supabase-store'

const STORAGE_KEY = '3wbw_alerts'

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
  if (!isSupabaseConfigured) return
  const remote = await supabaseGet<Alert>('alerts', { column: 'created_at' })
  if (remote.length > 0) saveAlerts(remote)
}

export function addAlert(alert: Alert): void {
  const list = loadAlerts()
  list.unshift(alert)
  saveAlerts(list)
  if (isSupabaseConfigured) supabaseAdd('alerts', alert)
}

export function updateAlert(id: string, updates: Partial<Alert>): void {
  const list = loadAlerts()
  const idx = list.findIndex((a) => a.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveAlerts(list)
    if (isSupabaseConfigured) supabaseUpdate('alerts', id, updates)
  }
}

export function toggleAlert(id: string): void {
  const list = loadAlerts()
  const idx = list.findIndex((a) => a.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], active: !list[idx].active }
    saveAlerts(list)
    if (isSupabaseConfigured) supabaseUpdate('alerts', id, { active: list[idx].active })
  }
}

export function deleteAlert(id: string): void {
  const list = loadAlerts().filter((a) => a.id !== id)
  saveAlerts(list)
  if (isSupabaseConfigured) supabaseDelete('alerts', id)
}
