import { articles as initialArticles } from './data'
import type { Article } from '@/types'

const STORAGE_KEY = '3wbw_articles'

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

export function addArticle(article: Article): void {
  const list = loadArticles()
  list.unshift(article)
  saveArticles(list)
}

export function updateArticle(id: string, updates: Partial<Article>): void {
  const list = loadArticles()
  const idx = list.findIndex((a) => a.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveArticles(list)
  }
}

export function deleteArticle(id: string): void {
  const list = loadArticles().filter((a) => a.id !== id)
  saveArticles(list)
}
