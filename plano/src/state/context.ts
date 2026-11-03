import { createContext, type Dispatch } from 'react'
import type { Plan } from '../types'
import type { PlanAction } from './planReducer'

export type PlanContextValue = { plan: Plan; dispatch: Dispatch<PlanAction> }

export const PlanContext = createContext<PlanContextValue | null>(null)
