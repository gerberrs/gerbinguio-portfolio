import type { LatLng, Place } from '../types'
import { MOCK_PLACES } from '../data/mockPlaces'
import { CATEGORIES, categoryFromOsm } from './categories'
import { distanceKm, inBounds, type Bounds } from './geo'

export type SearchSource = 'osm' | 'mock'
export type SearchResult = { places: Place[]; source: SearchSource; widened: boolean }

const NOMINATIM = 'https://nominatim.openstreetmap.org/search'
/** Metro Manila bounding box, used when the visible area has no matches. */
const METRO_MANILA: Bounds = { south: 14.35, west: 120.9, north: 14.78, east: 121.15 }
/** Nominatim policy: at most 1 request per second. */
const MIN_INTERVAL_MS = 1100

const forceMock = import.meta.env.VITE_USE_MOCK_PLACES === 'true'
const cache = new Map<string, Place[]>()
let lastRequestAt = 0

type NominatimItem = {
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  name: string
  display_name: string
  category: string
  type: string
}

function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(t)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

function shortAddress(item: NominatimItem): string {
  const parts = item.display_name.split(',').map((s) => s.trim())
  const rest = parts[0] === item.name ? parts.slice(1) : parts
  // Drop postcode / region / country tail to keep it readable.
  return rest
    .filter((p) => !/^\d{4}$/.test(p) && p !== 'Philippines' && p !== 'Metro Manila')
    .slice(0, 3)
    .join(', ')
}

function toPlace(item: NominatimItem): Place {
  const name = item.name || item.display_name.split(',')[0]
  return {
    id: `osm:${item.osm_type}/${item.osm_id}`,
    name,
    address: shortAddress(item),
    category: categoryFromOsm(item.category, item.type),
    lat: Number(item.lat),
    lon: Number(item.lon),
  }
}

async function nominatim(query: string, bounds: Bounds, signal?: AbortSignal): Promise<Place[]> {
  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    limit: '20',
    countrycodes: 'ph',
    bounded: '1',
    viewbox: `${bounds.west},${bounds.north},${bounds.east},${bounds.south}`,
    'accept-language': 'en',
  })
  const url = `${NOMINATIM}?${params}`
  const cached = cache.get(url)
  if (cached) return cached

  const since = Date.now() - lastRequestAt
  if (since < MIN_INTERVAL_MS) await wait(MIN_INTERVAL_MS - since, signal)
  lastRequestAt = Date.now()

  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Nominatim ${res.status}`)
  const items = (await res.json()) as NominatimItem[]
  const seen = new Set<string>()
  const places = items
    .map(toPlace)
    .filter((p) => p.name && !seen.has(p.id) && seen.add(p.id))
  cache.set(url, places)
  return places
}

function mockSearch(query: string, near: LatLng, bounds: Bounds): Place[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = MOCK_PLACES.filter((p) => {
    const hay = `${p.name} ${p.address} ${p.category} ${CATEGORIES[p.category].label} ${CATEGORIES[p.category].query}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
  const visible = matches.filter((p) => inBounds(p, bounds))
  const list = visible.length > 0 ? visible : matches
  return [...list].sort((a, b) => distanceKm(near, a) - distanceKm(near, b))
}

function sortByDistance(places: Place[], near: LatLng) {
  return [...places].sort((a, b) => distanceKm(near, a) - distanceKm(near, b))
}

/**
 * Search places near the current map view. Tries the visible area first,
 * then widens to all of Metro Manila. Falls back to mock data on failure.
 */
export async function searchPlaces(
  query: string,
  near: LatLng,
  bounds: Bounds,
  signal?: AbortSignal,
): Promise<SearchResult> {
  const q = query.trim()
  if (!q) return { places: [], source: forceMock ? 'mock' : 'osm', widened: false }

  if (forceMock) return { places: mockSearch(q, near, bounds), source: 'mock', widened: false }

  try {
    const local = await nominatim(q, bounds, signal)
    if (local.length > 0) return { places: sortByDistance(local, near), source: 'osm', widened: false }
    const wide = await nominatim(q, METRO_MANILA, signal)
    return { places: sortByDistance(wide, near), source: 'osm', widened: true }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    console.warn('Place search failed, using sample places.', err)
    return { places: mockSearch(q, near, bounds), source: 'mock', widened: false }
  }
}
