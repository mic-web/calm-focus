import React from 'react'
import * as sounds from '../services/sounds'
import { Phases } from '../types'
import StartButton from './StartButton'
import ResetButton from './ResetButton'
import { AppContext } from '../context/context'
import * as notification from '../services/notifications'
import * as webWorkers from '../services/web-workers'
import { Types } from '../context/timeReducer'
import useNextPhase from '../hooks/useNextPhase'

const onInteraction = (_event: React.SyntheticEvent) => {
  sounds.initOnInteraction()
}

const Controls: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext)
  const { phase } = state.timer
  const nextPhase = useNextPhase()

  function reset(event: React.SyntheticEvent) {
    onInteraction(event)
    dispatch({ type: Types.UpdatePhase, payload: { phase: Phases.WORK_READY } })
    webWorkers.stopTimer()
  }
  function start(event: React.SyntheticEvent) {
    onInteraction(event)
    notification.checkNotificationsEnabled()
    dispatch({ type: Types.UpdatePhase, payload: { phase: nextPhase } })
    webWorkers.startTimer()
  }

  return {
    [Phases.WORK_READY]: <StartButton start={start} />,
    [Phases.REST_READY]: <StartButton start={start} />,
    [Phases.WORK]: <ResetButton reset={reset} />,
    [Phases.REST]: <ResetButton reset={reset} />,
  }[phase]
}

export default Controls
