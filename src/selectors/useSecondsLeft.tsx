import React from 'react'
import { Seconds } from '../types'
import { AppContext } from '../context/context'
import usePhaseDuration from './usePhaseDuration'

export default (): Seconds => {
  const { state } = React.useContext(AppContext)
  const { passedSeconds } = state.timer
  const phaseDuration = usePhaseDuration()

  return phaseDuration - passedSeconds
}
