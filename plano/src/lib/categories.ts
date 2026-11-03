import type { PlaceCategory } from '../types'

type CategoryInfo = { label: string; emoji: string; query: string }

export const CATEGORIES: Record<PlaceCategory, CategoryInfo> = {
  cafe: { label: 'Cafe', emoji: '☕', query: 'cafe' },
  restaurant: { label: 'Food', emoji: '🍜', query: 'restaurant' },
  dessert: { label: 'Dessert', emoji: '🍰', query: 'dessert' },
  bar: { label: 'Bar', emoji: '🍸', query: 'bar' },
  park: { label: 'Park', emoji: '🌳', query: 'park' },
  museum: { label: 'Museum', emoji: '🖼️', query: 'museum' },
  mall: { label: 'Mall', emoji: '🛍️', query: 'mall' },
  activity: { label: 'Activity', emoji: '🎳', query: 'cinema' },
  other: { label: 'Place', emoji: '📍', query: '' },
}

/** Quick-pick chips under the search box. */
export const QUICK_CATEGORIES: PlaceCategory[] = [
  'cafe',
  'restaurant',
  'dessert',
  'bar',
  'park',
  'museum',
  'activity',
]

/** Map an OSM class/type pair (from Nominatim) onto our categories. */
export function categoryFromOsm(cls: string, type: string): PlaceCategory {
  if (type === 'cafe' || type === 'coffee_shop') return 'cafe'
  if (['restaurant', 'fast_food', 'food_court'].includes(type)) return 'restaurant'
  if (['ice_cream', 'bakery', 'confectionery', 'pastry'].includes(type)) return 'dessert'
  if (['bar', 'pub', 'biergarten', 'nightclub'].includes(type)) return 'bar'
  if (['park', 'garden', 'nature_reserve', 'playground'].includes(type)) return 'park'
  if (['museum', 'gallery', 'arts_centre'].includes(type)) return 'museum'
  if (type === 'mall' || type === 'department_store') return 'mall'
  if (['cinema', 'theatre', 'bowling_alley', 'amusement_arcade', 'escape_game', 'attraction', 'zoo', 'aquarium'].includes(type))
    return 'activity'
  if (cls === 'leisure') return 'activity'
  return 'other'
}
