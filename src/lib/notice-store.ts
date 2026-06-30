import { notices as initialNotices } from './data'
import type { Notice } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_notices'
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

function loadNotices(): Notice[] {
  if (!isBrowser()) return [...initialNotices]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Notice[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...initialNotices]
}

function saveNotices(notices: Notice[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices))
  } catch { /* ignore */ }
}

export function getNotices(): Notice[] {
  return loadNotices()
}

export async function seedNoticesFromSupabase(): Promise<void> {
  await syncTable<Notice>('notices', STORAGE_KEY, initialNotices)
  notify()
}

export function addNotice(notice: Notice): void {
  const list = loadNotices()
  list.unshift(notice)
  saveNotices(list)
  if (isSupabaseConfigured) supabaseAdd('notices', notice)
  notify()
}

export function updateNotice(id: string, updates: Partial<Notice>): void {
  const list = loadNotices()
  const idx = list.findIndex((n) => n.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveNotices(list)
    if (isSupabaseConfigured) supabaseUpdate('notices', id, updates)
    notify()
  }
}

export function togglePinNotice(id: string): void {
  const list = loadNotices()
  const idx = list.findIndex((n) => n.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], pinned: !list[idx].pinned }
    saveNotices(list)
    if (isSupabaseConfigured) supabaseUpdate('notices', id, { pinned: list[idx].pinned })
    notify()
  }
}

export function deleteNotice(id: string): void {
  const list = loadNotices().filter((n) => n.id !== id)
  saveNotices(list)
  if (isSupabaseConfigured) supabaseDelete('notices', id)
  notify()
}
