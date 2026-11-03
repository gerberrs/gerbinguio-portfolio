import { useCallback, useEffect, useRef, useState } from 'react'
import type { LatLng, Place } from '../types'
import type { Bounds } from '../lib/geo'
import { searchPlaces, type SearchSource } from '../lib/places'

export type MapView = { center: LatLng; bounds: Bounds }
type Status = 'idle' | 'loading' | 'done' | 'error'

const DEBOUNCE_MS = 600
const MIN_CHARS = 2

/**
 * Debounced place search. Typing searches the map view at that moment;
 * panning does not re-search on its own (keeps us polite to Nominatim),
 * use `searchArea()` for that.
 */
export function usePlaceSearch(query: string, getView: () => MapView) {
  const [places, setPlaces] = useState<Place[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [source, setSource] = useState<SearchSource>('osm')
  const [widened, setWidened] = useState(false)
  const [searchedQuery, setSearchedQuery] = useState('')
  const controller = useRef<AbortController | null>(null)

  const run = useCallback(
    async (q: string) => {
      controller.current?.abort()
      const trimmed = q.trim()
      if (trimmed.length < MIN_CHARS) {
        setPlaces([])
        setStatus('idle')
        setSearchedQuery('')
        return
      }
      const ac = new AbortController()
      controller.current = ac
      setStatus('loading')
      const view = getView()
      try {
        const result = await searchPlaces(trimmed, view.center, view.bounds, ac.signal)
        if (ac.signal.aborted) return
        setPlaces(result.places)
        setSource(result.source)
        setWidened(result.widened)
        setSearchedQuery(trimmed)
        setStatus('done')
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setStatus('error')
      }
    },
    [getView],
  )

  useEffect(() => {
    const t = setTimeout(() => void run(query), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [query, run])

  useEffect(() => () => controller.current?.abort(), [])

  const searchArea = useCallback(() => void run(query), [query, run])

  return { places, status, source, widened, searchedQuery, searchArea }
}
