import React from 'react'
import * as sounds from '../services/sounds'
import { Phases } from '../types'
import StartButton from './StartButton'
import ResetButton from './ResetButton'
import { AppContext } from '../context/context'
import * as notification from '../services/notifications'
import * as webWorkers from '../worker/web-workers'
import { TimerAction } from '../context/timeReducer'
import useNextPhase from '../selectors/useNextPhase'

const onInteraction = (_event: React.SyntheticEvent) => {
  sounds.initOnInteraction()
}

const Controls: React.FC = React.memo(() => {
  const { state, dispatch } = React.useContext(AppContext)
  const { phase } = state.timer
  const nextPhase = useNextPhase()

  const reset = React.useCallback(
    (event: React.SyntheticEvent) => {
      onInteraction(event)
      dispatch({ type: TimerAction.UpdatePhase, payload: { phase: Phases.WORK_READY } })
      webWorkers.stopTimer()
    },
    [dispatch]
  )
  const start = React.useCallback(
    (event: React.SyntheticEvent) => {
      onInteraction(event)
      notification.checkNotificationsEnabled()
      dispatch({ type: TimerAction.UpdatePhase, payload: { phase: nextPhase } })
      webWorkers.startTimer()
    },
    [dispatch, nextPhase]
  )
  return <ControlComponent start={start} reset={reset} phase={phase} />
})

const ControlComponent: React.FC<{
  start: (event: React.SyntheticEvent) => void
  reset: (event: React.SyntheticEvent) => void
  phase: Phases
}> = React.memo(({ start, reset, phase }) => {
  return {
    [Phases.WORK_READY]: <StartButton start={start} />,
    [Phases.REST_READY]: <StartButton start={start} />,
    [Phases.WORK]: <ResetButton reset={reset} />,
    [Phases.REST]: <ResetButton reset={reset} />,
  }[phase]
})

export default Controls
