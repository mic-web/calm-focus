import { States, Seconds, Minutes, Milliseconds } from './types'
import * as storage from './storage'

export const MILLISECONDS_PER_SECOND: Milliseconds = 1000
export const WORK_PHASE_MINUTES: Minutes = 0.2
export const REST_PHASE_MINUTES: Minutes = 0.1
const getStartSecondsFromMinutes = (phaseMinutes: Minutes): Seconds => phaseMinutes * 60
export const WORK_PHASE_SECONDS: Seconds = getStartSecondsFromMinutes(WORK_PHASE_MINUTES)
export const REST_PHASE_SECONDS: Seconds = getStartSecondsFromMinutes(REST_PHASE_MINUTES)

type TimerStatus = {
  secondsLeft: Seconds
  state: States
}

export const getPhaseSeconds = (state: States): Seconds =>
  ({
    [States.WORK]: WORK_PHASE_SECONDS,
    [States.WORK_READY]: WORK_PHASE_SECONDS,
    [States.REST]: REST_PHASE_SECONDS,
    [States.REST_READY]: REST_PHASE_SECONDS,
  }[state])

export const getPhaseMinutes = (state: States): Seconds =>
  ({
    [States.WORK]: WORK_PHASE_MINUTES,
    [States.WORK_READY]: WORK_PHASE_MINUTES,
    [States.REST]: REST_PHASE_MINUTES,
    [States.REST_READY]: REST_PHASE_MINUTES,
  }[state])

export const getInitialState = (): TimerStatus => {
  const state = storage.getSavedState() || States.WORK_READY
  const savedStartDate = storage.getSavedStartDate()
  const phaseSeconds = getPhaseSeconds(state)
  const defaultInitialState = {
    secondsLeft: Math.round(phaseSeconds),
    state,
  }
  if (!savedStartDate) {
    return defaultInitialState
  }
  const passedSeconds = (new Date().getTime() - new Date(savedStartDate).getTime()) / MILLISECONDS_PER_SECOND
  const remainingSeconds = Math.round(phaseSeconds - passedSeconds)
  if (remainingSeconds < 0) {
    storage.deleteStartDate()
    return defaultInitialState
  }
  return {
    secondsLeft: remainingSeconds,
    state,
  }
}

export const getPercentage = (secondsLeft: Seconds, phaseSeconds: Seconds) => {
  return (phaseSeconds - secondsLeft) / phaseSeconds
}
