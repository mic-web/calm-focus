import React from 'react'
import { Phases, Seconds, Minutes, Milliseconds, PhaseDurations } from '../types'
import * as storage from './storage'
import { AppContext } from './context'
import { usePhase } from './services/timer'

export const MILLISECONDS_PER_SECOND: Milliseconds = 1000
export const DEFAULT_WORK_PHASE_MINUTES: Minutes = 0.2
export const DEFAULT_REST_PHASE_MINUTES: Minutes = 0.1
const getStartSecondsFromMinutes = (phaseMinutes: Minutes): Seconds => phaseMinutes * 60
export const DEFAULT_WORK_PHASE_SECONDS: Seconds = getStartSecondsFromMinutes(DEFAULT_WORK_PHASE_MINUTES)
export const DEFAULT_REST_PHASE_SECONDS: Seconds = getStartSecondsFromMinutes(DEFAULT_REST_PHASE_MINUTES)

const mapPhaseToSeconds = (phase: Phases, phaseSeconds: PhaseDurations): Seconds =>
  ({
    [Phases.WORK]: phaseSeconds[Phases.WORK],
    [Phases.WORK_READY]: phaseSeconds[Phases.WORK],
    [Phases.REST]: phaseSeconds[Phases.REST],
    [Phases.REST_READY]: phaseSeconds[Phases.REST],
  }[phase])

export const usePhaseDuration = (): Seconds => {
  const { state } = React.useContext(AppContext)
  const { phase, phaseDurations: phaseSeconds } = state.timer

  const memoizedValue = React.useMemo(() => mapPhaseToSeconds(phase, phaseSeconds), [phase, phaseSeconds])
  return memoizedValue
}

export const useSecondsLeft = (): Seconds => {
  const { state } = React.useContext(AppContext)
  const { passedSeconds } = state.timer
  const phaseDuration = usePhaseDuration()

  const memoizedValue = React.useMemo(() => phaseDuration - passedSeconds, [phaseDuration, passedSeconds])
  return memoizedValue
}

export const useMinutesLeft = (): Seconds => {
  const secondsLeft = useSecondsLeft()
  const memoizedValue = React.useMemo(() => Math.floor(secondsLeft / 60), [secondsLeft])
  return memoizedValue
}

export const useProgress = (): number => {
  const secondsLeft = useSecondsLeft()
  const phase = usePhase()
  const phaseDuration = usePhaseDuration()

  if (phase === Phases.REST_READY || phase === Phases.WORK_READY) {
    return 1
  }
  return (phaseDuration - secondsLeft) / phaseDuration
}

export const initPhaseSeconds = (): PhaseDurations => {
  const storedSeconds = storage.loadPhaseSeconds()
  if (storedSeconds) {
    return storedSeconds
  }
  return {
    [Phases.WORK]: (storedSeconds && storedSeconds[Phases.WORK]) || DEFAULT_WORK_PHASE_SECONDS,
    [Phases.REST]: (storedSeconds && storedSeconds[Phases.REST]) || DEFAULT_REST_PHASE_SECONDS,
  }
}

export const getPercentage = (secondsLeft: Seconds, phaseSeconds: Seconds) => {
  return (phaseSeconds - secondsLeft) / phaseSeconds
}
