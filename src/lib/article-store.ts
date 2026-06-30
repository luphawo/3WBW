import { articles as initialArticles } from './data'
import type { Article } from '@/types'
import { supabaseAdd, supabaseUpdate, supabaseDelete, isSupabaseConfigured, syncTable } from './supabase-store'

const STORAGE_KEY = '3wbw_articles'
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

function loadArticles(): Article[] {
  if (!isBrowser()) return normalize([...initialArticles])
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Article[]
      if (parsed.length > 0) return normalize(parsed)
    }
  } catch { /* ignore */ }
  return normalize([...initialArticles])
}

function normalize(articles: Article[]): Article[] {
  return articles.map((a) => ({
    ...a,
    author: { id: "admin", name: "Admin", avatar: a.author.avatar, role: "Administrator" },
  }))
}

function saveArticles(articles: Article[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  } catch { /* ignore */ }
}

export function getArticles(): Article[] {
  return loadArticles()
}

export async function seedArticlesFromSupabase(): Promise<void> {
  await syncTable<Article>('articles', STORAGE_KEY, initialArticles)
  notify()
}

export async function addArticle(article: Article): Promise<void> {
  const list = loadArticles()
  list.unshift(article)
  saveArticles(list)
  if (isSupabaseConfigured) await supabaseAdd('articles', article)
  notify()
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<void> {
  const list = loadArticles()
  const idx = list.findIndex((a) => a.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveArticles(list)
    if (isSupabaseConfigured) await supabaseUpdate('articles', id, updates)
    notify()
  }
}

export async function deleteArticle(id: string): Promise<void> {
  const list = loadArticles().filter((a) => a.id !== id)
  saveArticles(list)
  if (isSupabaseConfigured) await supabaseDelete('articles', id)
  notify()
}
