import { useEffect, useReducer, type ReactNode } from 'react'
import { PlanContext } from './context'
import { emptyPlan, planReducer } from './planReducer'
import { loadDraft, saveDraft } from '../lib/storage'

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, dispatch] = useReducer(planReducer, undefined, () => loadDraft() ?? emptyPlan())

  useEffect(() => {
    saveDraft(plan)
  }, [plan])

  return <PlanContext.Provider value={{ plan, dispatch }}>{children}</PlanContext.Provider>
}
