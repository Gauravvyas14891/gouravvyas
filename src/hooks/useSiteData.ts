import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

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
