import React from 'react'
import { Seconds, Phases, PhaseDurations } from '../types'
import { AppContext } from '../context/context'

const mapPhaseToSeconds = (phase: Phases, phaseSeconds: PhaseDurations): Seconds =>
  ({
    [Phases.WORK]: phaseSeconds[Phases.WORK],
    [Phases.WORK_READY]: phaseSeconds[Phases.WORK],
    [Phases.REST]: phaseSeconds[Phases.REST],
    [Phases.REST_READY]: phaseSeconds[Phases.REST],
  }[phase])

export default (): Seconds => {
  const { state } = React.useContext(AppContext)
  const { phase, phaseDurations: phaseSeconds } = state.timer

  const memoizedValue = React.useMemo(() => mapPhaseToSeconds(phase, phaseSeconds), [phase, phaseSeconds])
  return memoizedValue
}
