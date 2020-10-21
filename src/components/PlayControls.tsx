import React from 'react'
import { Phases } from '../types'
import StartButton from './StartButton'
import ResetButton from './ResetButton'
import { AppContext } from '../context/context'
import { TimerAction } from '../context/timeReducer'
import { useNextPhase } from '../selectors/useNextPhase'
import useKeyboardEvent from '../hooks/useKeyboardEvent'
import { useMenuContext } from './Menu'
import { isActivePhase } from '../services/timer'
import { useNotificationManager } from '../services/NotificationsProvider'
import { useSoundManager } from '../services/SoundProvider'

const Controls: React.FC = React.memo(() => {
  const { state, dispatch } = React.useContext(AppContext)
  const notification = useNotificationManager()
  const sounds = useSoundManager()
  const { phase } = state.timer
  const nextPhase = useNextPhase()
  const { open } = useMenuContext()

  const reset = React.useCallback(() => {
    sounds.initOnInteraction()
    dispatch({ type: TimerAction.UpdatePhase, payload: { phase: Phases.WORK_READY, autoPlayStarted: false } })
  }, [dispatch, sounds])
  const start = React.useCallback(() => {
    sounds.initOnInteraction()
    notification.tryAskPermission()
    dispatch({ type: TimerAction.UpdatePhase, payload: { phase: nextPhase, autoPlayStarted: true } })
  }, [dispatch, nextPhase, notification, sounds])
  const toggle = React.useCallback(() => {
    if (!isActivePhase(phase)) {
      start()
    } else {
      reset()
    }
  }, [phase, start, reset])
  useKeyboardEvent('keyup', ' ', toggle, !open)

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
