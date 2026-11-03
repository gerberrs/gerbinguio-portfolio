import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Clock, GripVertical, NotebookPen, Trash2 } from 'lucide-react'
import type { Stop } from '../types'
import { CATEGORIES } from '../lib/categories'

type Props = {
  stop: Stop
  index: number
  active: boolean
  onFocus: () => void
  onChange: (fields: Partial<Pick<Stop, 'time' | 'note'>>) => void
  onRemove: () => void
}

export function StopCard({ stop, index, active, onFocus, onChange, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: stop.id })
  const [noteOpen, setNoteOpen] = useState(stop.note.length > 0)
  const cat = CATEGORIES[stop.place.category]

  return (
    <li
      ref={setNodeRef}
      id={`stop-${stop.id}`}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative rounded-2xl border bg-white transition-shadow ${
        isDragging ? 'z-10 border-brand shadow-xl shadow-ink/15' : active ? 'border-brand ring-4 ring-brand/10' : 'border-line'
      }`}
    >
      <div className="flex items-center gap-1 py-2 pr-2 pl-1">
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label={`Reorder ${stop.place.name}. Press space, then arrow keys to move.`}
          className="grid h-11 w-9 shrink-0 cursor-grab touch-none place-items-center rounded-lg text-ink-soft hover:bg-sand active:cursor-grabbing"
        >
          <GripVertical className="size-5" />
        </button>

        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
          {index + 1}
        </span>

        <button type="button" onClick={onFocus} className="min-w-0 flex-1 px-2 text-left">
          <span className="block truncate font-semibold">
            <span aria-hidden className="mr-1">{cat.emoji}</span>
            {stop.place.name}
          </span>
          {stop.place.address && <span className="block truncate text-sm text-ink-soft">{stop.place.address}</span>}
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${stop.place.name}`}
          className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-brand-soft hover:text-brand-dark"
        >
          <Trash2 className="size-4.5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-line/70 px-3 py-2.5">
        <label className="flex h-10 items-center gap-2 rounded-xl bg-sand px-3 text-sm focus-within:ring-2 focus-within:ring-brand/30">
          <Clock className="size-4 text-ink-soft" />
          <span className="sr-only">Time for {stop.place.name}</span>
          <input
            type="time"
            value={stop.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="bg-transparent font-medium outline-none"
          />
        </label>
        {!noteOpen && (
          <button
            type="button"
            onClick={() => setNoteOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-ink-soft hover:bg-sand"
          >
            <NotebookPen className="size-4" /> Add note
          </button>
        )}
      </div>

      {noteOpen && (
        <div className="px-3 pb-3">
          <label className="sr-only" htmlFor={`note-${stop.id}`}>
            Note for {stop.place.name}
          </label>
          <textarea
            id={`note-${stop.id}`}
            value={stop.note}
            onChange={(e) => onChange({ note: e.target.value })}
            onBlur={() => stop.note.trim() === '' && setNoteOpen(false)}
            autoFocus={stop.note === ''}
            rows={2}
            placeholder="Reserve a table, bring a jacket, try the ube latte..."
            className="w-full resize-none rounded-xl border border-line bg-cream/60 p-2.5 text-base outline-none placeholder:text-ink-soft/70 focus:border-brand focus:ring-4 focus:ring-brand/15 sm:text-sm"
          />
        </div>
      )}
    </li>
  )
}
