import React from 'react'
import { Seconds } from '../types'
import { AppContext } from '../context/context'
import usePhaseDuration from './usePhaseDuration'

export default (): Seconds => {
  const { state } = React.useContext(AppContext)
  const { passedSeconds } = state.timer
  const phaseDuration = usePhaseDuration()
  const secondsLeft = phaseDuration - passedSeconds
  if (secondsLeft < 0) {
    // Ensure that temporary negative values won't be displayed
    return 0
  }
  return secondsLeft
}
