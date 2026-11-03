import { Loader2, MapPin } from 'lucide-react'
import type { LatLng, Place } from '../types'
import type { SearchSource } from '../lib/places'
import { SearchBar } from './SearchBar'
import { ResultCard } from './ResultCard'

type Props = {
  query: string
  onQueryChange: (q: string) => void
  places: Place[]
  status: 'idle' | 'loading' | 'done' | 'error'
  source: SearchSource
  widened: boolean
  searchedQuery: string
  near: LatLng
  activeId: string | null
  addedPlaceIds: Set<string>
  onFocus: (place: Place) => void
  onAdd: (place: Place) => void
}

export function ExplorePanel(props: Props) {
  const { places, status, near, activeId, addedPlaceIds } = props

  return (
    <div className="space-y-4">
      <SearchBar value={props.query} onChange={props.onQueryChange} />

      <div aria-live="polite" className="min-h-5 text-sm text-ink-soft">
        {status === 'loading' && (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Searching...
          </span>
        )}
        {status === 'done' && places.length > 0 && (
          <span>
            {places.length} {places.length === 1 ? 'place' : 'places'} for "{props.searchedQuery}"
            {props.widened ? ' across Metro Manila' : ' in this area'}
            {props.source === 'mock' && ' (sample places, offline mode)'}
          </span>
        )}
        {status === 'done' && places.length === 0 && (
          <span>No places found for "{props.searchedQuery}". Try another word or move the map.</span>
        )}
        {status === 'error' && <span>Search is not working right now. Try again in a moment.</span>}
      </div>

      {status === 'idle' && places.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line p-6 text-center text-ink-soft">
          <MapPin className="mx-auto mb-2 size-6 text-brand" />
          <p className="font-medium text-ink">Where to?</p>
          <p className="mt-1 text-sm">Search or tap a category to find spots near the map.</p>
        </div>
      )}

      <ul className="space-y-2.5">
        {places.map((p) => (
          <ResultCard
            key={p.id}
            place={p}
            near={near}
            active={activeId === p.id}
            added={addedPlaceIds.has(p.id)}
            onFocus={() => props.onFocus(p)}
            onAdd={() => props.onAdd(p)}
          />
        ))}
      </ul>
    </div>
  )
}
