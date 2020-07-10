import React from 'react'
import { Phases, Seconds, Minutes, PhaseDurations } from '../types'
import * as storage from './storage'
import * as webWorkers from '../worker/web-workers'
import { AppContext } from '../context/context'
import { Types } from '../context/timeReducer'
import { playTimeOver } from './sounds'
import { showNotification } from './service-worker'
import usePhaseDuration from '../hooks/usePhaseDuration'
import useNextPhase from '../hooks/useNextPhase'
import useSecondsLeft from '../hooks/useSecondsLeft'

const DEFAULT_WORK_PHASE_MINUTES: Minutes = 25
const DEFAULT_REST_PHASE_MINUTES: Minutes = 5
export const DEFAULT_WORK_PHASE_SECONDS: Seconds = DEFAULT_WORK_PHASE_MINUTES * 60
export const DEFAULT_REST_PHASE_SECONDS: Seconds = DEFAULT_REST_PHASE_MINUTES * 60

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

const notifyTimeOver = (phase: Phases) => {
  playTimeOver()
  if (phase === Phases.WORK) {
    showNotification('Done, take a break', {
      body: `Take a break for ${DEFAULT_REST_PHASE_MINUTES} minutes`,
      icon: 'images/icon-192.png',
      silent: true,
    })
  } else if (phase === Phases.REST) {
    showNotification('Focus again', {
      body: `Focus again for ${DEFAULT_WORK_PHASE_MINUTES} minutes`,
      icon: 'images/icon-192.png',
      silent: true,
    })
  }
}

export const useTimer = () => {
  const { state, dispatch } = React.useContext(AppContext)
  const { phase } = state.timer
  const phaseDuration = usePhaseDuration()
  const nextPhase = useNextPhase()
  const secondsLeft = useSecondsLeft()
  React.useEffect(() => {
    if (secondsLeft === 0) {
      notifyTimeOver(phase)
      dispatch({ type: Types.UpdatePhase, payload: { phase: nextPhase } })
    }
  }, [dispatch, nextPhase, phase, secondsLeft])
  React.useEffect(() => {
    webWorkers.loadWorker()
  }, [])
  React.useEffect(() => {
    if (phase === Phases.WORK || phase === Phases.REST) {
      webWorkers.startTimer()
    }
    if (phase === Phases.WORK_READY || phase === Phases.REST_READY) {
      webWorkers.stopTimer()
    }
  }, [phase])

  React.useEffect(() => {
    if (phase === Phases.WORK || phase === Phases.REST) {
      webWorkers.startTimer()
      const unsubscribe = webWorkers.subscribe((passedSeconds: Seconds) => {
        dispatch({ type: Types.UpdatePassedSeconds, payload: { passedSeconds } })
      })
      return unsubscribe
    }
    return undefined
  }, [phase, phaseDuration, dispatch])
}
