import { useEffect, useRef } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { LatLng, Place, Stop } from '../types'
import { DEFAULT_CENTER, DEFAULT_ZOOM, type Bounds } from '../lib/geo'
import { resultIcon, stopIcon } from './pins'

type Props = {
  results: Place[]
  stops: Stop[]
  showResults: boolean
  activeId: string | null
  addedPlaceIds: Set<string>
  /** Changes whenever the map should refit to `fitPoints`. */
  fitKey: string
  fitPoints: LatLng[]
  focus: LatLng | null
  onSelect: (id: string) => void
  onViewChange: (view: { center: LatLng; bounds: Bounds }, byUser: boolean) => void
}

function readView(map: L.Map) {
  const c = map.getCenter()
  const b = map.getBounds()
  return {
    center: { lat: c.lat, lon: c.lng },
    bounds: { south: b.getSouth(), west: b.getWest(), north: b.getNorth(), east: b.getEast() },
  }
}

/** Reports view changes and handles programmatic fit / focus. */
function Controller({ fitKey, fitPoints, focus, onViewChange }: Pick<Props, 'fitKey' | 'fitPoints' | 'focus' | 'onViewChange'>) {
  const map = useMap()
  const programmatic = useRef(false)
  const lastFit = useRef('')

  useMapEvents({
    moveend: () => {
      onViewChange(readView(map), !programmatic.current)
      programmatic.current = false
    },
  })

  useEffect(() => {
    onViewChange(readView(map), false)
    // Size can change when the mobile layout settles.
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(map.getContainer())
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  useEffect(() => {
    if (fitKey === lastFit.current || fitPoints.length === 0) return
    lastFit.current = fitKey
    programmatic.current = true
    if (fitPoints.length === 1) {
      map.flyTo([fitPoints[0].lat, fitPoints[0].lon], Math.max(map.getZoom(), 15), { duration: 0.6 })
    } else {
      const bounds = L.latLngBounds(fitPoints.map((p) => [p.lat, p.lon]))
      map.flyToBounds(bounds, { padding: [40, 40], maxZoom: 16, duration: 0.6 })
    }
  }, [fitKey, fitPoints, map])

  useEffect(() => {
    if (!focus) return
    programmatic.current = true
    map.flyTo([focus.lat, focus.lon], Math.max(map.getZoom(), 15), { duration: 0.5 })
  }, [focus, map])

  return null
}

// Phones pinch to zoom, so the +/- buttons only show on wider screens.
const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches

export function MapView(props: Props) {
  const { results, stops, showResults, activeId, addedPlaceIds, onSelect } = props
  const route = stops.map((s) => [s.place.lat, s.place.lon] as [number, number])

  return (
    <MapContainer
      center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lon]}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {isDesktop && <ZoomControl position="topright" />}
      <Controller
        fitKey={props.fitKey}
        fitPoints={props.fitPoints}
        focus={props.focus}
        onViewChange={props.onViewChange}
      />

      {route.length > 1 && (
        <>
          <Polyline positions={route} pathOptions={{ color: '#ffffff', weight: 7, opacity: 0.9 }} />
          <Polyline positions={route} pathOptions={{ color: '#e2574c', weight: 4, dashArray: '8 8' }} />
        </>
      )}

      {showResults &&
        results.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lon]}
            icon={resultIcon(p.category, activeId === p.id, addedPlaceIds.has(p.id))}
            zIndexOffset={activeId === p.id ? 500 : 0}
            eventHandlers={{ click: () => onSelect(p.id) }}
          >
            <Tooltip direction="top" offset={[0, -16]}>
              {p.name}
            </Tooltip>
          </Marker>
        ))}

      {stops.map((s, i) => (
        <Marker
          key={s.id}
          position={[s.place.lat, s.place.lon]}
          icon={stopIcon(i + 1, activeId === s.id)}
          zIndexOffset={1000}
          eventHandlers={{ click: () => onSelect(s.id) }}
        >
          <Tooltip direction="top" offset={[0, -30]}>
            {i + 1}. {s.place.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
