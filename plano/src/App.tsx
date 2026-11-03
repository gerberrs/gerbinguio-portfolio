import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Heart, LocateFixed, RefreshCw } from 'lucide-react'
import type { LatLng, Place, Stop } from './types'
import { DEFAULT_CENTER, type Bounds } from './lib/geo'
import { usePlan } from './state/usePlan'
import { usePlaceSearch, type MapView as View } from './hooks/usePlaceSearch'
import { MapView } from './components/MapView'
import { ExplorePanel } from './components/ExplorePanel'
import { Itinerary } from './components/Itinerary'
import { Toast } from './components/Toast'

type Tab = 'explore' | 'plan'

const INITIAL_VIEW: View = {
  center: DEFAULT_CENTER,
  bounds: { south: 14.5, west: 120.97, north: 14.61, east: 121.08 },
}

export default function App() {
  const { plan, dispatch } = usePlan()
  const [tab, setTab] = useState<Tab>('explore')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [focus, setFocus] = useState<LatLng | null>(null)
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER)
  const [movedSinceSearch, setMovedSinceSearch] = useState(false)
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null)
  const viewRef = useRef<View>(INITIAL_VIEW)

  const getView = useCallback(() => viewRef.current, [])
  const search = usePlaceSearch(query, getView)

  const onViewChange = useCallback((view: { center: LatLng; bounds: Bounds }, byUser: boolean) => {
    viewRef.current = view
    setCenter(view.center)
    if (byUser) setMovedSinceSearch(true)
  }, [])

  // A finished search covers the current view.
  useEffect(() => {
    if (search.status === 'done') setMovedSinceSearch(false)
  }, [search.status, search.places])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  // Keep the selected card visible when it is picked on the map.
  useEffect(() => {
    if (!activeId) return
    const el = document.getElementById(`result-${activeId}`) ?? document.getElementById(`stop-${activeId}`)
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeId, tab])

  const addedPlaceIds = useMemo(() => new Set(plan.stops.map((s) => s.place.id)), [plan.stops])

  const stopIds = plan.stops.map((s) => s.id).join(',')
  const fit = useMemo(() => {
    if (tab === 'plan') return { key: `plan:${stopIds}`, points: plan.stops.map((s) => s.place) as LatLng[] }
    return { key: `explore:${search.searchedQuery}:${search.places.map((p) => p.id).join(',')}`, points: search.places as LatLng[] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, stopIds, search.places, search.searchedQuery])

  function addPlace(place: Place) {
    dispatch({ type: 'add_stop', place })
    setToast({ message: `Added ${place.name}`, key: Date.now() })
  }

  function focusPlace(place: Place) {
    setActiveId(place.id)
    setFocus({ lat: place.lat, lon: place.lon })
  }

  function focusStop(stop: Stop) {
    setActiveId(stop.id)
    setFocus({ lat: stop.place.lat, lon: stop.place.lon })
  }

  function selectOnMap(id: string) {
    setActiveId(id)
    if (plan.stops.some((s) => s.id === id)) setTab('plan')
  }

  function locateMe() {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setFocus({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setToast({ message: 'Could not get your location', key: Date.now() }),
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }

  const showSearchArea = tab === 'explore' && movedSinceSearch && query.trim().length >= 2 && search.status !== 'loading'

  return (
    <div className="flex h-dvh flex-col overflow-hidden md:flex-row-reverse">
      {/* Map */}
      <div className="relative h-[42dvh] shrink-0 md:h-full md:flex-1">
        <MapView
          results={search.places}
          stops={plan.stops}
          showResults={tab === 'explore'}
          activeId={activeId}
          addedPlaceIds={addedPlaceIds}
          fitKey={fit.key}
          fitPoints={fit.points}
          focus={focus}
          onSelect={selectOnMap}
          onViewChange={onViewChange}
        />

        {showSearchArea && (
          <button
            type="button"
            onClick={search.searchArea}
            className="absolute top-3 left-1/2 z-[500] flex h-10 -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold shadow-lg shadow-ink/20"
          >
            <RefreshCw className="size-4 text-brand" /> Search this area
          </button>
        )}

        <button
          type="button"
          onClick={locateMe}
          aria-label="Center map on my location"
          className="absolute right-3 bottom-7 z-[500] grid size-11 place-items-center rounded-full bg-white shadow-lg shadow-ink/20 md:bottom-6"
        >
          <LocateFixed className="size-5 text-ink" />
        </button>
      </div>

      {/* Panel */}
      <section className="relative z-[600] -mt-4 flex min-h-0 flex-1 flex-col rounded-t-3xl bg-cream shadow-[0_-8px_24px_rgba(43,35,32,0.08)] md:mt-0 md:w-[420px] md:flex-none md:rounded-none md:border-r md:border-line md:shadow-none">
        <header className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-white">
              <Heart className="size-5 fill-current" />
            </span>
            <div className="leading-tight">
              <h1 className="text-lg font-extrabold tracking-tight">Plano</h1>
              <p className="hidden text-xs text-ink-soft sm:block">Dates and hangouts, planned</p>
            </div>
          </div>

          <div role="tablist" aria-label="Panel" className="flex rounded-xl bg-sand p-1">
            {(['explore', 'plan'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition-colors ${
                  tab === t ? 'bg-white text-ink shadow-sm' : 'text-ink-soft'
                }`}
              >
                {t === 'explore' ? 'Explore' : 'Plan'}
                {t === 'plan' && plan.stops.length > 0 && (
                  <span className="grid min-w-5 place-items-center rounded-full bg-brand px-1.5 text-xs text-white">
                    {plan.stops.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-1 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {tab === 'explore' ? (
            <ExplorePanel
              query={query}
              onQueryChange={setQuery}
              places={search.places}
              status={search.status}
              source={search.source}
              widened={search.widened}
              searchedQuery={search.searchedQuery}
              near={center}
              activeId={activeId}
              addedPlaceIds={addedPlaceIds}
              onFocus={focusPlace}
              onAdd={addPlace}
            />
          ) : (
            <Itinerary activeId={activeId} onFocus={focusStop} onExplore={() => setTab('explore')} />
          )}
        </div>

        {toast && (
          <div className="pointer-events-none absolute inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))]">
            <Toast
              key={toast.key}
              message={toast.message}
              actionLabel={tab === 'explore' ? 'View plan' : undefined}
              onAction={() => {
                setTab('plan')
                setToast(null)
              }}
            />
          </div>
        )}
      </section>
    </div>
  )
}
