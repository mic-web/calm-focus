import React from 'react'
import { Phases } from '../types'
import { AppContext } from '../context/context'

export default (): Phases => {
  const { state } = React.useContext(AppContext)

  return state.timer.phase
}
