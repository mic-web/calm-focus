import React from 'react'
import { Seconds, Minutes, EditablePhases } from '../types'
import { AppContext } from '../context/context'
import { TimerAction } from '../context/timeReducer'
import usePhaseDuration from './usePhaseDuration'
import { roundToQuarter } from '../services/timer'

const minToSec = (minutes: Minutes): Seconds => Math.round(minutes * 60)

const secondsToMinutes = (seconds: Seconds): Minutes => {
  // Don't ignore quarter minutes
  return seconds / 60
}

const useUpdateMinutes = (phase: EditablePhases) => {
  const { dispatch } = React.useContext(AppContext)

  const update = React.useCallback(
    (minutes: Minutes) => {
      const clamp = (number: number) => (number < 0.25 ? 0.25 : number)
      const seconds = minToSec(clamp(roundToQuarter(minutes)))
      return dispatch({
        type: TimerAction.UpdatePhaseSeconds,
        payload: {
          phase,
          seconds,
        },
      })
    },
    [dispatch, phase]
  )
  return update
}

export const useDecreaseMinutes = (phase: EditablePhases) => {
  const seconds = usePhaseDuration(phase)
  const update = useUpdateMinutes(phase)
  const decrease = React.useCallback(() => {
    const minutes = secondsToMinutes(seconds)
    if (minutes <= 2) {
      // Allow finer adjustment - e.g. for HIIT training
      if (minutes > 0.25) {
        update(minutes - 0.25)
      }
    } else if (minutes > 2) {
      // Use 1.25 to avoid race conditions when configuring while time is runing
      update(minutes - 1)
    }
  }, [seconds, update])
  return decrease
}

export const useIncreaseMinutes = (phase: EditablePhases) => {
  const seconds = usePhaseDuration(phase)
  const update = useUpdateMinutes(phase)
  const increase = React.useCallback(() => {
    const minutes = secondsToMinutes(seconds)
    if (minutes < 2) {
      // Allow finer adjustment - e.g. for HIIT training
      update(minutes + 0.25)
    } else {
      update(secondsToMinutes(seconds) + 1)
    }
  }, [seconds, update])
  return increase
}

export default useUpdateMinutes
