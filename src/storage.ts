import { States } from './types'

const phaseStartDateKey = 'startDate'
const lastStateKey = 'lastStateKey'

// Change to store 'timeOverAt'-date instead of storing start date
export const saveStartDate = () => window.localStorage.setItem(phaseStartDateKey, new Date().toString())
export const deleteStartDate = () => window.localStorage.removeItem(phaseStartDateKey)
export const getSavedStartDate = (): Date | null => {
  const savedStartDate = window.localStorage.getItem(phaseStartDateKey)
  return (savedStartDate && new Date(savedStartDate)) || null
}

export const saveState = (state: States) => {
  window.localStorage.setItem(lastStateKey, state.toString())
}

export const getSavedState = (): States | null => {
  const stateValue: string | null = window.localStorage.getItem(lastStateKey)
  if (stateValue) {
    return States[stateValue as keyof typeof States] as States
  }
  return null
}
