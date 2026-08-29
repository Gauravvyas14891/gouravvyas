import { useMemo } from 'react'
import { useContentBlock } from '@/hooks/useSiteData'
import { defaultContentBlocks, type SectionId } from '@/content/defaultContent'

export function normalizeOrder(order: unknown): SectionId[] {
  const all = defaultContentBlocks.layout.order
  const incoming = Array.isArray(order) ? (order as SectionId[]) : []
  const kept = incoming.filter((id, i) => all.includes(id) && incoming.indexOf(id) === i)
  return [...kept, ...all.filter((id) => !kept.includes(id))]
}

export function useSectionOrder() {
  const { data, save, saving, reload } = useContentBlock('layout')
  const order = useMemo(() => normalizeOrder(data.order), [data.order])
  return { order, save, saving, reload }
}
