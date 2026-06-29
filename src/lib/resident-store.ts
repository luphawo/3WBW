import { residents as initialResidents } from './data'
import type { Resident } from '@/types'

const STORAGE_KEY = '3wbw_residents'

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

export function addResident(resident: Resident): void {
  const list = loadResidents()
  list.push(resident)
  saveResidents(list)
}

export function updateResident(id: string, updates: Partial<Resident>): void {
  const list = loadResidents()
  const idx = list.findIndex((r) => r.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveResidents(list)
  }
}

export function deleteResident(id: string): void {
  const list = loadResidents().filter((r) => r.id !== id)
  saveResidents(list)
}
