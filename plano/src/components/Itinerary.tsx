import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { AlertTriangle, ArrowDownUp, Route, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Stop } from '../types'
import { usePlan } from '../state/usePlan'
import { distanceKm, formatKm, routeKm } from '../lib/geo'
import { formatTime, isOutOfOrder } from '../lib/time'
import { StopCard } from './StopCard'

type Props = {
  activeId: string | null
  onFocus: (stop: Stop) => void
  onExplore: () => void
}

export function Itinerary({ activeId, onFocus, onExplore }: Props) {
  const { plan, dispatch } = usePlan()
  const { stops } = plan

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    // Short press on the handle starts a drag; a quick swipe elsewhere still scrolls.
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return
    const ids = stops.map((s) => s.id)
    const from = ids.indexOf(String(active.id))
    const to = ids.indexOf(String(over.id))
    dispatch({ type: 'reorder_stops', order: arrayMove(ids, from, to) })
  }

  if (stops.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line p-8 text-center text-ink-soft">
        <Route className="mx-auto mb-2 size-7 text-brand" />
        <p className="font-medium text-ink">Your plan is empty</p>
        <p className="mt-1 text-sm">Find a few spots and add them here. You can set times and reorder later.</p>
        <button
          type="button"
          onClick={onExplore}
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-4 font-semibold text-white hover:bg-brand-dark"
        >
          <Search className="size-4" /> Find places
        </button>
      </div>
    )
  }

  const total = routeKm(stops.map((s) => s.place))
  const timed = stops.filter((s) => s.time)
  const outOfOrder = isOutOfOrder(stops.map((s) => s.time))

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">
            {stops.length} {stops.length === 1 ? 'stop' : 'stops'}
          </h2>
          <p className="text-sm text-ink-soft">
            {timed.length > 0 && `${formatTime(timed[0].time)} to ${formatTime(timed[timed.length - 1].time)}`}
            {timed.length > 0 && stops.length > 1 && ' · '}
            {stops.length > 1 && `${formatKm(total)} straight line`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => confirm('Remove all stops from this plan?') && dispatch({ type: 'clear' })}
          className="h-9 rounded-lg px-2 text-sm font-medium text-ink-soft hover:bg-sand"
        >
          Clear
        </button>
      </div>

      {outOfOrder && (
        <div role="status" className="flex items-center gap-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="size-5 shrink-0" />
          <span className="flex-1">Some times are out of order.</span>
          <button
            type="button"
            onClick={() => dispatch({ type: 'sort_by_time' })}
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 font-semibold shadow-sm"
          >
            <ArrowDownUp className="size-4" /> Sort by time
          </button>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ol className="relative space-y-2">
            {stops.map((stop, i) => (
              <StopWithLeg key={stop.id} stops={stops} index={i}>
                <StopCard
                  stop={stop}
                  index={i}
                  active={activeId === stop.id}
                  onFocus={() => onFocus(stop)}
                  onChange={(fields) => dispatch({ type: 'update_stop', stopId: stop.id, fields })}
                  onRemove={() => dispatch({ type: 'remove_stop', stopId: stop.id })}
                />
              </StopWithLeg>
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </div>
  )
}

/** Renders the distance from the previous stop above each card after the first. */
function StopWithLeg({ stops, index, children }: { stops: Stop[]; index: number; children: ReactNode }) {
  if (index === 0) return <>{children}</>
  const km = distanceKm(stops[index - 1].place, stops[index].place)
  return (
    <>
      <li aria-hidden className="flex items-center gap-2 pl-[3.1rem] text-xs font-medium text-ink-soft">
        <span className="h-4 border-l-2 border-dashed border-brand/40" />
        {formatKm(km)}
      </li>
      {children}
    </>
  )
}
