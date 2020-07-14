import React from 'react'
import { Seconds, Minutes, EditablePhases } from '../types'
import { AppContext } from '../context/context'
import { TimerAction } from '../context/timeReducer'
import usePhaseDuration from './usePhaseDuration'

const minToSec = (minutes: Minutes): Seconds => minutes * 60

const secToMin = (seconds: Seconds): Minutes => {
  const restSeconds = seconds % 60
  return seconds / 60 - restSeconds
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

export const useDecreaseMinutes = (phase: EditablePhases) => {
  const duration = usePhaseDuration(phase)
  const update = useUpdateMinutes(phase)
  const mayDecrease = secToMin(duration) > 1
  const decrease = React.useCallback(() => {
    if (mayDecrease) {
      update(secToMin(duration) - 1)
    }
  }, [duration, update, mayDecrease])
  return decrease
}

export const useIncreaseMinutes = (phase: EditablePhases) => {
  const duration = usePhaseDuration(phase)
  const update = useUpdateMinutes(phase)
  const increase = React.useCallback(() => {
    update(secToMin(duration) + 1)
  }, [duration, update])
  return increase
}

export default useUpdateMinutes
