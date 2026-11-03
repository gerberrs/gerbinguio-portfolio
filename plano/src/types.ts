export type LatLng = { lat: number; lon: number }

export type PlaceCategory =
  | 'cafe'
  | 'restaurant'
  | 'dessert'
  | 'bar'
  | 'park'
  | 'museum'
  | 'mall'
  | 'activity'
  | 'other'

export type Place = LatLng & {
  /** Stable id, e.g. "osm:node/123" or "mock:12". */
  id: string
  name: string
  address: string
  category: PlaceCategory
}

export type Stop = {
  id: string
  place: Place
  /** 24h "HH:MM", or "" when not set. */
  time: string
  note: string
}

export type Plan = {
  id: string
  title: string
  stops: Stop[]
  updatedAt: string
}
