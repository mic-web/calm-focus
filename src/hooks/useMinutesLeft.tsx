import React from 'react'
import { Seconds } from '../types'
import useSecondsLeft from './useSecondsLeft'

export default (): Seconds => {
  const secondsLeft = useSecondsLeft()
  const memoizedValue = React.useMemo(() => Math.floor(secondsLeft / 60), [secondsLeft])
  return memoizedValue
}
