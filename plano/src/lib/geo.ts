import type { LatLng } from '../types'

/** Metro Manila, roughly centered on Makati / BGC. */
export const DEFAULT_CENTER: LatLng = { lat: 14.5547, lon: 121.0244 }
export const DEFAULT_ZOOM = 13

export type Bounds = { south: number; west: number; north: number; east: number }

/** Great-circle distance in km. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function routeKm(points: LatLng[]): number {
  let total = 0
  for (let i = 1; i < points.length; i++) total += distanceKm(points[i - 1], points[i])
  return total
}

export function formatKm(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}

export function inBounds(p: LatLng, b: Bounds): boolean {
  return p.lat >= b.south && p.lat <= b.north && p.lon >= b.west && p.lon <= b.east
}
