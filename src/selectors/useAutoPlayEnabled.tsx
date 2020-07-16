import React from 'react'
import { AppContext } from '../context/context'

export const useAutoPlayEnabled = (): boolean => {
  const { state } = React.useContext(AppContext)
  const { autoPlay } = state.timer

  return autoPlay
}

export default useAutoPlayEnabled
