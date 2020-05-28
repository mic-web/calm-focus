import { PhaseDurations } from './types'

export const savePhaseSeconds = (data: PhaseDurations) => {
  window.localStorage.setItem('phaseSeconds', JSON.stringify(data))
}

export const loadPhaseSeconds = (): PhaseDurations | null => {
  const data = window.localStorage.getItem('phaseSeconds')
  if (!data) {
    return null
  }
  return JSON.parse(data)
}
