import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import {
  cloneContent,
  defaultContentBlocks,
  mergeContent,
  type ContentBlockKey,
  type ContentBlockMap,
} from '@/content/defaultContent'

export type SiteSettings = {
  email: string | null
  linkedin_url: string | null
  github_url: string | null
  location: string | null
}

export type CustomSection = {
  id: string
  title: string
  slug: string
  type: string
  intro: string | null
  position: number
  visible: boolean
}

export type SectionItem = {
  id: string
  section_id: string
  title: string
  subtitle: string | null
  description: string | null
  period: string | null
  file_url: string | null
  file_name: string | null
  meta: Record<string, unknown>
  position: number
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const load = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
    if (data) setSettings(data as SiteSettings)
  }, [])
  useEffect(() => {
    load()
  }, [load])
  return { settings, reload: load }
}

export function useCustomSections(includeHidden = false) {
  const [sections, setSections] = useState<CustomSection[]>([])
  const [items, setItems] = useState<SectionItem[]>([])

  const load = useCallback(async () => {
    let q = supabase.from('custom_sections').select('*').order('position')
    if (!includeHidden) q = q.eq('visible', true)
    const { data: secs } = await q
    setSections((secs || []) as CustomSection[])
    const { data: its } = await supabase.from('section_items').select('*').order('position')
    setItems((its || []) as SectionItem[])
  }, [includeHidden])

  useEffect(() => {
    load()
  }, [load])

  return { sections, items, reload: load }
}

export function useContentBlock<K extends ContentBlockKey>(key: K) {
  const [data, setData] = useState<ContentBlockMap[K]>(() => cloneContent(defaultContentBlocks[key]))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const { data: row } = await supabase.from('content_blocks').select('data').eq('key', key).maybeSingle()
    setData(mergeContent(defaultContentBlocks[key], row?.data))
    setLoading(false)
  }, [key])

  const save = useCallback(
    async (next: ContentBlockMap[K]) => {
      setSaving(true)
      const { error } = await supabase.from('content_blocks').upsert({
        key,
        data: next as unknown as never,
        updated_at: new Date().toISOString(),
      })
      setSaving(false)
      if (!error) setData(cloneContent(next))
      return { error }
    },
    [key]
  )

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, saving, reload: load, save }
}
