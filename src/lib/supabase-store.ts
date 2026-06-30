import { supabase, isSupabaseConfigured, supabaseUrl, isBrowser } from './supabase'
export { isSupabaseConfigured, supabaseUrl }

export async function supabaseGet<T extends { id: string }>(
  table: string,
  orderBy?: { column: string; ascending?: boolean }
): Promise<T[]> {
  if (!isSupabaseConfigured || !supabase) return []
  let query = supabase.from(table).select('*')
  if (orderBy) {
    query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false })
  }
  const { data, error } = await query
  if (error) {
    console.error(`Supabase get ${table} error:`, error)
    return []
  }
  return (data as T[]) ?? []
}

export async function supabaseAdd<T extends { id: string }>(
  table: string,
  item: T
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false
  const { error } = await supabase.from(table).insert(item as any)
  if (error) {
    console.error(`Supabase add ${table} error:`, error)
    return false
  }
  return true
}

export async function supabaseUpdate<T>(
  table: string,
  id: string,
  updates: Partial<T>
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false
  const { error } = await supabase.from(table).update(updates as any).eq('id', id)
  if (error) {
    console.error(`Supabase update ${table} error:`, error)
    return false
  }
  return true
}

export async function supabaseDelete(
  table: string,
  id: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) {
    console.error(`Supabase delete ${table} error:`, error)
    return false
  }
  return true
}

// localStorage fallback helpers (unchanged pattern)
export function localStorageGet<T>(key: string, fallback: T[]): T[] {
  if (!isBrowser()) return [...fallback]
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored) as T[]
      if (parsed.length > 0) return parsed
    }
  } catch { /* ignore */ }
  return [...fallback]
}

export function localStorageSave<T>(key: string, items: T[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(key, JSON.stringify(items))
  } catch { /* ignore */ }
}

export async function syncTable<T extends { id: string }>(
  table: string,
  storageKey: string,
  initialData: T[]
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return

  const local = localStorageGet<T>(storageKey, initialData)
  if (local.length > 0) {
    const { error: upsertError } = await supabase.from(table).upsert(local as any, { onConflict: 'id' })
    if (upsertError) console.error(`Supabase sync ${table} upsert error:`, upsertError)
  }

  const { data, error } = await supabase.from(table).select('*')
  if (error) {
    console.error(`Supabase sync ${table} select error:`, error)
    return
  }
  const remote = (data as T[]) ?? []
  if (remote.length > 0) {
    localStorageSave(storageKey, remote)
  }
}

export async function forcePushTable<T extends { id: string }>(
  table: string,
  storageKey: string,
  initialData: T[]
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return 'Supabase not configured'
  const local = localStorageGet<T>(storageKey, initialData)
  if (local.length === 0) return 'No data to push'
  const { error } = await supabase.from(table).upsert(local as any, { onConflict: 'id' })
  return error ? `${error.code}: ${error.message}` : null
}
