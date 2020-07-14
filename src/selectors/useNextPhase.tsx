import React from 'react'
import { Phases } from '../types'
import { AppContext } from '../context/context'

const getNextPhase = (currentPhase: Phases) =>
  ({
    [Phases.WORK_READY]: Phases.WORK,
    [Phases.WORK]: Phases.REST_READY,
    [Phases.REST_READY]: Phases.REST,
    [Phases.REST]: Phases.WORK_READY,
  }[currentPhase])

export default (): Phases => {
  const { state } = React.useContext(AppContext)
  const { phase } = state.timer

  return getNextPhase(phase)
}
