import type { Place, Plan, Stop } from '../types'
import { newId } from '../lib/id'
import { suggestNextTime, toMinutes } from '../lib/time'

/**
 * Every change to a plan goes through these actions. They mirror the chat
 * agent tools planned in CLAUDE.md (add_stop, update_stop, remove_stop,
 * reorder_stops) so the agent can drive the same reducer later.
 */
export type PlanAction =
  | { type: 'add_stop'; place: Place; time?: string; note?: string }
  | { type: 'update_stop'; stopId: string; fields: Partial<Pick<Stop, 'time' | 'note'>> }
  | { type: 'remove_stop'; stopId: string }
  | { type: 'reorder_stops'; order: string[] }
  | { type: 'sort_by_time' }
  | { type: 'clear' }
  | { type: 'load'; plan: Plan }

export function emptyPlan(): Plan {
  return { id: newId('plan'), title: 'Untitled plan', stops: [], updatedAt: new Date().toISOString() }
}

function touch(plan: Plan, stops: Stop[]): Plan {
  return { ...plan, stops, updatedAt: new Date().toISOString() }
}

export function planReducer(plan: Plan, action: PlanAction): Plan {
  switch (action.type) {
    case 'add_stop': {
      const stop: Stop = {
        id: newId('stop'),
        place: action.place,
        time: action.time ?? suggestNextTime(plan.stops.map((s) => s.time)),
        note: action.note ?? '',
      }
      return touch(plan, [...plan.stops, stop])
    }
    case 'update_stop':
      return touch(
        plan,
        plan.stops.map((s) => (s.id === action.stopId ? { ...s, ...action.fields } : s)),
      )
    case 'remove_stop':
      return touch(plan, plan.stops.filter((s) => s.id !== action.stopId))
    case 'reorder_stops': {
      const byId = new Map(plan.stops.map((s) => [s.id, s]))
      const ordered = action.order.map((id) => byId.get(id)).filter((s): s is Stop => !!s)
      // Keep any stops the order forgot, at the end, so nothing is lost.
      const missing = plan.stops.filter((s) => !action.order.includes(s.id))
      return touch(plan, [...ordered, ...missing])
    }
    case 'sort_by_time': {
      const key = (s: Stop) => toMinutes(s.time) ?? Number.POSITIVE_INFINITY
      // Array.prototype.sort is stable, so untimed stops keep their order.
      return touch(plan, [...plan.stops].sort((a, b) => key(a) - key(b)))
    }
    case 'clear':
      return touch(plan, [])
    case 'load':
      return action.plan
  }
}
