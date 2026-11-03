import L from 'leaflet'
import type { PlaceCategory } from '../types'
import { CATEGORIES } from '../lib/categories'

/** Result pin: white bubble with the category emoji. */
export function resultIcon(category: PlaceCategory, active: boolean, added: boolean) {
  const size = active ? 40 : 32
  const ring = added ? '#3f8f6b' : active ? '#e2574c' : '#ffffff'
  return L.divIcon({
    className: 'plano-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:#fff;border:3px solid ${ring};box-shadow:0 2px 6px rgba(43,35,32,.25);display:grid;place-items:center;font-size:${active ? 20 : 16}px;transition:all .15s">${CATEGORIES[category].emoji}</div>`,
  })
}

/** Itinerary stop pin: numbered coral teardrop. */
export function stopIcon(n: number, active: boolean) {
  const size = active ? 38 : 32
  return L.divIcon({
    className: 'plano-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    html: `<div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${active ? '#c4443a' : '#e2574c'};border:3px solid #fff;box-shadow:0 2px 6px rgba(43,35,32,.3);display:grid;place-items:center"><span style="transform:rotate(45deg);color:#fff;font-weight:700;font-size:14px">${n}</span></div>`,
  })
}
