import React from 'react'
import { Seconds, Phases } from '../types'
import { AppContext } from '../context/context'
import { narrowEditablePhase } from '../services/timer'

const usePhaseDuration = (selectedPhase?: Phases): Seconds => {
  const { state } = React.useContext(AppContext)
  // Use currently active phase if no other is defined
  const phase = selectedPhase || state.timer.phase
  const durations = state.timer.phaseDurations
  const phaseDuration = durations[narrowEditablePhase(phase)]
  return phaseDuration
}

export default usePhaseDuration
