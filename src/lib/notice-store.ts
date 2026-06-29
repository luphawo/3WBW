import { notices as initialNotices } from './data'
import type { Notice } from '@/types'
import { supabaseGet, supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured } from './supabase-store'

const STORAGE_KEY = '3wbw_notices'

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
  if (!isSupabaseConfigured) return
  const remote = await supabaseGet<Notice>('notices', { column: 'created_at' })
  if (remote.length > 0) saveNotices(remote)
}

export function addNotice(notice: Notice): void {
  const list = loadNotices()
  list.unshift(notice)
  saveNotices(list)
  if (isSupabaseConfigured) supabaseAdd('notices', notice)
}

export function updateNotice(id: string, updates: Partial<Notice>): void {
  const list = loadNotices()
  const idx = list.findIndex((n) => n.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveNotices(list)
    if (isSupabaseConfigured) supabaseUpdate('notices', id, updates)
  }
}

export function togglePinNotice(id: string): void {
  const list = loadNotices()
  const idx = list.findIndex((n) => n.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], pinned: !list[idx].pinned }
    saveNotices(list)
    if (isSupabaseConfigured) supabaseUpdate('notices', id, { pinned: list[idx].pinned })
  }
}

export function deleteNotice(id: string): void {
  const list = loadNotices().filter((n) => n.id !== id)
  saveNotices(list)
  if (isSupabaseConfigured) supabaseDelete('notices', id)
}
