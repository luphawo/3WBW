import { incidents as initialIncidents } from './data'
import type { Incident } from '@/types'

const STORAGE_KEY = '3wbw_incidents'

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

export function addIncident(incident: Incident): void {
  const list = loadIncidents()
  list.unshift(incident)
  saveIncidents(list)
}

export function updateIncident(id: string, updates: Partial<Incident>): void {
  const list = loadIncidents()
  const idx = list.findIndex((i) => i.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveIncidents(list)
  }
}

export function deleteIncident(id: string): void {
  const list = loadIncidents().filter((i) => i.id !== id)
  saveIncidents(list)
}
