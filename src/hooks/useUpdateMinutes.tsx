import React from 'react'
import { Phases, Seconds, Minutes, EditablePhases } from '../types'
import { AppContext } from '../context/context'
import { Types } from '../context/timeReducer'

const minToSec = (minutes: Minutes): Seconds => minutes * 60

const secToMin = (seconds: Seconds): Minutes => {
  const restSeconds = seconds % 60
  return seconds / 60 - restSeconds
}

const useUpdateMinutes = (phase: EditablePhases) => {
  const { state, dispatch } = React.useContext(AppContext)
  const duration: Seconds = state.timer.phaseDurations[phase]
  const update = React.useCallback(
    (minutes: Minutes) =>
      dispatch({
        type: Types.UpdatePhaseSeconds,
        payload: {
          phase,
          seconds: minToSec(minutes),
        },
      }),
    [dispatch, phase]
  )
  const mayDecrease = secToMin(duration) > 1
  const increase = React.useCallback(() => update(secToMin(duration) + 1), [duration, update])
  const decrease = React.useCallback(() => mayDecrease && update(secToMin(duration) - 1), [
    duration,
    update,
    mayDecrease,
  ])
  return {
    increase,
    decrease,
    update,
  }
}

export default useUpdateMinutes
