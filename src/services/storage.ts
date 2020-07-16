import { PhaseDurations } from '../types'

export const savePhaseSeconds = (durations: PhaseDurations) => {
  window.localStorage.setItem('phaseSeconds', JSON.stringify(durations))
}

export const loadPhaseSeconds = (): PhaseDurations | null => {
  const data = window.localStorage.getItem('phaseSeconds')
  if (!data) {
    return null
  }
  return JSON.parse(data)
}

export const saveAutoPlay = (enabled: boolean) => {
  window.localStorage.setItem('autoPlay', JSON.stringify(enabled))
}

export const loadAutoPlay = (): boolean | null => {
  const data = window.localStorage.getItem('autoPlay')
  if (!data) {
    return null
  }
  return JSON.parse(data)
}
