import React from 'react'
import { Seconds, Minutes, EditablePhases } from '../types'
import { AppContext } from '../context/context'
import { TimerAction } from '../context/timeReducer'
import usePhaseDuration from './usePhaseDuration'

const minToSec = (minutes: Minutes): Seconds => minutes * 60

const secondsToMinutes = (seconds: Seconds): Minutes => {
  return seconds / 60
}

const useUpdateMinutes = (phase: EditablePhases) => {
  const { dispatch } = React.useContext(AppContext)

  const update = React.useCallback(
    (minutes: Minutes) => {
      return dispatch({
        type: TimerAction.UpdatePhaseSeconds,
        payload: {
          phase,
          seconds: minToSec(minutes),
        },
      })
    },
    [dispatch, phase]
  )
  return update
}

export const useDecreaseMinutes = (phase: EditablePhases, enableQuarterSteps = false) => {
  const seconds = usePhaseDuration(phase)
  const update = useUpdateMinutes(phase)
  const decrease = React.useCallback(() => {
    const minutes = secondsToMinutes(seconds)
    if (enableQuarterSteps && minutes < 1.25) {
      // Allow finer adjustment - e.g. for HIIT training
      if (minutes > 0.25) {
        update(minutes - 0.25)
      }
    } else if (minutes >= 1.25) {
      // Use 1.25 to avoid race conditions when configuring while time is runing
      update(minutes - 1)
    }
  }, [seconds, update, enableQuarterSteps])
  return decrease
}

export const useIncreaseMinutes = (phase: EditablePhases, enableQuarterSteps = false) => {
  const seconds = usePhaseDuration(phase)
  const update = useUpdateMinutes(phase)
  const increase = React.useCallback(() => {
    const minutes = secondsToMinutes(seconds)
    if (enableQuarterSteps && minutes < 1) {
      // Allow finer adjustment - e.g. for HIIT training
      update(minutes + 0.25)
    } else {
      update(secondsToMinutes(seconds) + 1)
    }
  }, [seconds, update, enableQuarterSteps])
  return increase
}

export default useUpdateMinutes
