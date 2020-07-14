import { Seconds } from '../types'
import useSecondsLeft from './useSecondsLeft'

export default (): Seconds => {
  const secondsLeft = useSecondsLeft()
  return Math.floor(secondsLeft / 60)
}
