import { Check, Plus } from 'lucide-react'
import type { LatLng, Place } from '../types'
import { CATEGORIES } from '../lib/categories'
import { distanceKm, formatKm } from '../lib/geo'

type Props = {
  place: Place
  near: LatLng
  active: boolean
  added: boolean
  onFocus: () => void
  onAdd: () => void
}

export function ResultCard({ place, near, active, added, onFocus, onAdd }: Props) {
  const cat = CATEGORIES[place.category]
  return (
    <li
      id={`result-${place.id}`}
      className={`flex items-center gap-3 rounded-2xl border bg-white p-3 transition-colors ${
        active ? 'border-brand ring-4 ring-brand/10' : 'border-line'
      }`}
    >
      <button type="button" onClick={onFocus} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl bg-sand text-xl">
          {cat.emoji}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-semibold">{place.name}</span>
          <span className="block truncate text-sm text-ink-soft">
            {cat.label} · {formatKm(distanceKm(near, place))}
            {place.address && ` · ${place.address}`}
          </span>
        </span>
      </button>
      <button
        type="button"
        onClick={onAdd}
        disabled={added}
        aria-label={added ? `${place.name} is in your plan` : `Add ${place.name} to plan`}
        className={`flex h-10 shrink-0 items-center gap-1 rounded-xl px-3 text-sm font-semibold transition-colors ${
          added ? 'bg-leaf/10 text-leaf' : 'bg-brand text-white hover:bg-brand-dark active:scale-95'
        }`}
      >
        {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        {added ? 'Added' : 'Add'}
      </button>
    </li>
  )
}
