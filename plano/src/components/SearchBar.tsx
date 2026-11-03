import { Search, X } from 'lucide-react'
import type { PlaceCategory } from '../types'
import { CATEGORIES, QUICK_CATEGORIES } from '../lib/categories'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  const active = value.trim().toLowerCase()
  const pick = (c: PlaceCategory) => onChange(active === CATEGORIES[c].query ? '' : CATEGORIES[c].query)

  return (
    <div className="space-y-3">
      <label className="relative block">
        <span className="sr-only">Search places</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-ink-soft" />
        <input
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search cafes, parks, ramen..."
          className="h-12 w-full rounded-2xl border border-line bg-white pr-11 pl-11 text-base shadow-sm outline-none placeholder:text-ink-soft/70 focus:border-brand focus:ring-4 focus:ring-brand/15 [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-soft hover:bg-sand"
          >
            <X className="size-4" />
          </button>
        )}
      </label>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {QUICK_CATEGORIES.map((c) => {
          const on = active === CATEGORIES[c].query
          return (
            <button
              key={c}
              type="button"
              onClick={() => pick(c)}
              aria-pressed={on}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${
                on ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand/50'
              }`}
            >
              <span aria-hidden>{CATEGORIES[c].emoji}</span>
              {CATEGORIES[c].label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
