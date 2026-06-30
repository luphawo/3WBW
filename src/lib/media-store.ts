import { galleryImages } from './data'
import type { GalleryImage } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

export interface MediaItem {
  id: string
  src: string
  category: string
  caption: string
  width?: number
  height?: number
  hidden?: boolean
}

const STATIC_MEDIA: MediaItem[] = [
  { id: 'hero-1', src: '/hero/gate-entrance.webp', category: 'hero', caption: 'Main entrance gate' },
  { id: 'logo-1', src: '/3wbw-logo.png', category: 'branding', caption: '3WBW Logo (PNG)' },
  { id: 'logo-2', src: '/3wbw-logo.svg', category: 'branding', caption: '3WBW Logo (SVG)' },
  ...galleryImages.map((img) => ({
    id: img.id,
    src: img.src,
    category: img.category,
    caption: img.caption || '',
    width: img.width,
    height: img.height,
  })),
]

const STORAGE_KEY = '3wbw_media'
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

function loadMedia(): MediaItem[] {
  if (!isBrowser()) return [...STATIC_MEDIA]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as MediaItem[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...STATIC_MEDIA]
}

function saveMedia(items: MediaItem[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch { /* ignore */ }
}

export function getMediaItems(): MediaItem[] {
  return loadMedia()
}

export function getGalleryItems(): MediaItem[] {
  return loadMedia().filter((item) => item.category !== 'hero' && item.category !== 'branding' && !item.hidden)
}

export async function seedMediaFromSupabase(): Promise<void> {
  await syncTable<MediaItem>('media', STORAGE_KEY, STATIC_MEDIA)
  notify()
}

export function addMediaItem(item: MediaItem): void {
  const list = loadMedia()
  list.unshift(item)
  saveMedia(list)
  if (isSupabaseConfigured) supabaseAdd('media', item)
  notify()
}

export function updateMediaItem(id: string, updates: Partial<MediaItem>): void {
  const list = loadMedia()
  const idx = list.findIndex((m) => m.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveMedia(list)
    if (isSupabaseConfigured) supabaseUpdate('media', id, updates)
    notify()
  }
}

export function deleteMediaItem(id: string): void {
  const list = loadMedia().filter((m) => m.id !== id)
  saveMedia(list)
  if (isSupabaseConfigured) supabaseDelete('media', id)
  notify()
}
