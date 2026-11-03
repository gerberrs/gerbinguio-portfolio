import type { Plan } from '../types'

/**
 * Local draft storage. Stand-in until Supabase is set up (feature 4),
 * which will add savePlan/loadPlan against the database.
 */
const DRAFT_KEY = 'plano:draft'

export function loadDraft(): Plan | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const plan = JSON.parse(raw) as Plan
    return Array.isArray(plan?.stops) ? plan : null
  } catch {
    return null
  }
}

export function saveDraft(plan: Plan): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(plan))
  } catch {
    // Private mode or full storage: the plan still works for this session.
  }
}
