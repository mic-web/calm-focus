import React from 'react'
import { Phases, Seconds, Minutes, PhaseDurations, EditablePhases } from '../types'
import * as storage from './storage'
import * as webWorkers from '../worker/web-workers'
import { AppContext } from '../context/context'
import { TimerAction } from '../context/timeReducer'
import usePhaseDuration from '../selectors/usePhaseDuration'
import useNextPhase from '../selectors/useNextPhase'
import useSecondsLeft from '../selectors/useSecondsLeft'
import { useServiceWorkerManager } from './ServiceWorkerProvider'
import { useSoundManager } from './SoundProvider'

const DEFAULT_WORK_PHASE_MINUTES: Minutes = 25
const DEFAULT_REST_PHASE_MINUTES: Minutes = 5
export const DEFAULT_WORK_PHASE_SECONDS: Seconds = DEFAULT_WORK_PHASE_MINUTES * 60
export const DEFAULT_REST_PHASE_SECONDS: Seconds = DEFAULT_REST_PHASE_MINUTES * 60

export const initPhaseSeconds = (): PhaseDurations => {
  const storedSeconds = storage.loadPhaseSeconds()
  return {
    [Phases.WORK]: (storedSeconds && storedSeconds[Phases.WORK]) || DEFAULT_WORK_PHASE_SECONDS,
    [Phases.REST]: (storedSeconds && storedSeconds[Phases.REST]) || DEFAULT_REST_PHASE_SECONDS,
  }
}

export const roundToQuarter = (minutes: Minutes) => Math.round(minutes * 4) / 4

export const isActivePhase = (phase: Phases): boolean => phase === Phases.REST || phase === Phases.WORK

export const narrowEditablePhase = (phase: Phases): EditablePhases =>
  ({
    [Phases.REST_READY]: Phases.REST,
    [Phases.WORK_READY]: Phases.WORK,
    [Phases.REST]: Phases.REST,
    [Phases.WORK]: Phases.WORK,
  }[phase] as EditablePhases)

const useNotifyTimeOver = () => {
  const serviceWorker = useServiceWorkerManager()
  const sound = useSoundManager()

  const notifyTimeOver = React.useCallback(
    (nextPhase: Phases, durations: PhaseDurations) => {
      sound.playTimeOver()
      const nextMainPhase = narrowEditablePhase(nextPhase)
      if (nextMainPhase === Phases.REST) {
        const minutes: Minutes = durations[nextMainPhase] / 60
        serviceWorker.showNotification('Done, take a break', {
          body: `Rest for ${minutes} minutes`,
          icon: 'images/icon-192.png',
          silent: true,
        })
      } else if (nextMainPhase === Phases.WORK) {
        const minutes: Minutes = durations[nextMainPhase] / 60
        serviceWorker.showNotification('Focus again', {
          body: `Focus again for ${minutes} minutes`,
          icon: 'images/icon-192.png',
          silent: true,
        })
      } else {
        // eslint-disable-next-line no-console
        console.warn('No notification available for this phase:', nextPhase)
      }
    },
    [serviceWorker, sound]
  )
  return notifyTimeOver
}

export const useTimer = () => {
  const { state, dispatch } = React.useContext(AppContext)
  const { phase } = state.timer
  const phaseDuration = usePhaseDuration()
  const nextPhase = useNextPhase()
  const secondsLeft = useSecondsLeft()
  const notifyTimeOver = useNotifyTimeOver()

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      notifyTimeOver(nextPhase, state.timer.phaseDurations)
      dispatch({ type: TimerAction.UpdatePhase, payload: { phase: nextPhase } })
    }
  }, [dispatch, nextPhase, phase, secondsLeft, state.timer.phaseDurations, notifyTimeOver])
  React.useEffect(() => {
    webWorkers.loadWorker()
  }, [])
  React.useEffect(() => {
    // On phase change, start or stop the timer
    if (isActivePhase(phase)) {
      webWorkers.startTimer()
    } else {
      webWorkers.stopTimer()
    }
  }, [phase])

  React.useEffect(() => {
    if (isActivePhase(phase)) {
      return webWorkers.subscribe((passedSeconds: Seconds) => {
        dispatch({ type: TimerAction.UpdatePassedSeconds, payload: { passedSeconds } })
      })
    }
    return undefined
  }, [phase, phaseDuration, dispatch])
}
