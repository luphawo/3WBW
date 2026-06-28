import { galleryImages } from './data'
import type { GalleryImage } from '@/types'

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

const STORAGE_KEY = '3wbw_media_overrides'

interface MediaOverrides {
  updates: Record<string, Partial<MediaItem>>
  hidden: string[]
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function loadOverrides(): MediaOverrides {
  if (!isBrowser()) return { updates: {}, hidden: [] }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as MediaOverrides
  } catch { /* ignore */ }
  return { updates: {}, hidden: [] }
}

function saveOverrides(overrides: MediaOverrides): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch { /* ignore */ }
}

export function getMediaItems(): MediaItem[] {
  const overrides = loadOverrides()
  return STATIC_MEDIA
    .filter((item) => !overrides.hidden.includes(item.id))
    .map((item) => (overrides.updates[item.id] ? { ...item, ...overrides.updates[item.id] } : item))
}

export function getGalleryItems(): MediaItem[] {
  return getMediaItems().filter((item) => item.category !== 'hero' && item.category !== 'branding')
}

export function updateMediaItem(id: string, updates: Partial<MediaItem>): void {
  const overrides = loadOverrides()
  overrides.updates[id] = { ...(overrides.updates[id] || {}), ...updates }
  saveOverrides(overrides)
}

export function deleteMediaItem(id: string): void {
  const overrides = loadOverrides()
  if (!overrides.hidden.includes(id)) {
    overrides.hidden.push(id)
  }
  saveOverrides(overrides)
}
