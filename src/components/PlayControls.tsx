import React from 'react'
import * as sounds from '../services/sounds'
import { Phases } from '../types'
import StartButton from './StartButton'
import ResetButton from './ResetButton'
import { AppContext } from '../context/context'
import * as notification from '../services/notifications'
import { TimerAction } from '../context/timeReducer'
import { useNextPhase } from '../selectors/useNextPhase'
import useKeyboardEvent from '../hooks/useKeyboardEvent'
import { useMenuContext } from './Menu'
import { isActivePhase } from '../services/timer'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onInteraction = (_event: React.SyntheticEvent) => {
  sounds.initOnInteraction()
}

const Controls: React.FC = React.memo(() => {
  const { state, dispatch } = React.useContext(AppContext)
  const { phase } = state.timer
  const nextPhase = useNextPhase()
  const { open } = useMenuContext()

  const reset = React.useCallback(
    (event: React.SyntheticEvent) => {
      onInteraction(event)
      dispatch({ type: TimerAction.UpdatePhase, payload: { phase: Phases.WORK_READY, autoPlayStarted: false } })
    },
    [dispatch]
  )
  const start = React.useCallback(
    (event: React.SyntheticEvent) => {
      onInteraction(event)
      notification.checkNotificationsEnabled()
      dispatch({ type: TimerAction.UpdatePhase, payload: { phase: nextPhase, autoPlayStarted: true } })
    },
    [dispatch, nextPhase]
  )
  const toggle = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (!isActivePhase(phase)) {
        start(event)
      } else {
        reset(event)
      }
    },
    [phase, start, reset]
  )
  useKeyboardEvent('keyup', ' ', toggle as any, !open)

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
