import React from 'react'
import { Phases } from '../types'
import { AppContext } from '../context/context'
import { isActivePhase } from '../services/timer'

export const getNextPhase = (currentPhase: Phases) =>
  ({
    [Phases.WORK_READY]: Phases.WORK,
    [Phases.WORK]: Phases.REST_READY,
    [Phases.REST_READY]: Phases.REST,
    [Phases.REST]: Phases.WORK_READY,
  }[currentPhase])

export const useNextPhase = (): Phases => {
  const { state } = React.useContext(AppContext)
  const { phase } = state.timer

  if (state.timer.autoPlay && !state.timer.autoPlayStarted && isActivePhase(phase)) {
    // Switch to second next phase only when timer is already running
    // Else, there would be an endless loop of "ready" phases
    return getNextPhase(getNextPhase(phase))
  }
  return getNextPhase(phase)
}

export default useNextPhase
