import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

export function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

export function DragRow({
  index,
  onMove,
  className,
  children,
}: {
  index: number
  onMove: (from: number, to: number) => void
  className?: string
  children: React.ReactNode
}) {
  const [armed, setArmed] = useState(false)
  const [over, setOver] = useState(false)

  return (
    <div
      draggable={armed}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', String(index))
        e.dataTransfer.effectAllowed = 'move'
      }}
      onDragEnd={() => {
        setArmed(false)
        setOver(false)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setOver(false)
        setArmed(false)
        const from = Number(e.dataTransfer.getData('text/plain'))
        if (!Number.isNaN(from) && from !== index) onMove(from, index)
      }}
      className={cn(className, over && 'ring-1 ring-ring/60')}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-label="Drag to reorder"
          title="Drag to reorder"
          onMouseDown={() => setArmed(true)}
          onMouseUp={() => setArmed(false)}
          onTouchStart={() => setArmed(true)}
          onTouchEnd={() => setArmed(false)}
          className="mt-2 shrink-0 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
