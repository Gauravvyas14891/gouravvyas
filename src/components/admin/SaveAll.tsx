import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'

type Saver = () => Promise<unknown>

type SaveAllContextValue = {
  register: (saver: Saver) => () => void
  saveAll: () => Promise<void>
  savingAll: boolean
}

const SaveAllContext = createContext<SaveAllContextValue | null>(null)

export function SaveAllProvider({ children }: { children: React.ReactNode }) {
  const saversRef = useRef(new Map<number, Saver>())
  const idRef = useRef(0)
  const [savingAll, setSavingAll] = useState(false)

  const register = useCallback((saver: Saver) => {
    const id = ++idRef.current
    saversRef.current.set(id, saver)
    return () => {
      saversRef.current.delete(id)
    }
  }, [])

  const saveAll = useCallback(async () => {
    if (saversRef.current.size === 0) {
      toast.info('Nothing to save')
      return
    }
    setSavingAll(true)
    try {
      const results = await Promise.all([...saversRef.current.values()].map((fn) => fn()))
      const errors = results.filter(
        (r): r is { message: string } => !!r && typeof r === 'object' && 'message' in (r as Record<string, unknown>)
      )
      if (errors.length > 0) {
        errors.forEach((e) => toast.error(e.message))
        toast.error(`${errors.length} section(s) failed to save`)
      } else {
        toast.success('All changes saved & published live')
      }
    } finally {
      setSavingAll(false)
    }
  }, [])

  return (
    <SaveAllContext.Provider value={{ register, saveAll, savingAll }}>
      {children}
    </SaveAllContext.Provider>
  )
}

export function useRegisterSave(saver: Saver) {
  const ctx = useContext(SaveAllContext)
  const ref = useRef(saver)
  ref.current = saver

  useEffect(() => {
    if (!ctx) return
    return ctx.register(() => ref.current())
  }, [ctx])
}

export function SaveAllBar() {
  const ctx = useContext(SaveAllContext)
  if (!ctx) return null
  return (
    <div className="sticky bottom-0 z-20 -mx-6 md:-mx-10 px-6 md:px-10 py-5 border-t border-gray-800 bg-background/90 backdrop-blur">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white">Ready to publish?</p>
          <p className="text-xs text-gray-500">
            Saves every section above (order, about, skills, projects, education, goals, contact) in one click. Changes go live instantly.
          </p>
        </div>
        <Button size="lg" onClick={ctx.saveAll} disabled={ctx.savingAll}>
          <Rocket className="w-4 h-4 mr-2" />
          {ctx.savingAll ? 'Publishing…' : 'Save & Publish All Changes'}
        </Button>
      </div>
    </div>
  )
}
