import useSecondsLeft from './useSecondsLeft'
import usePhase from './usePhase'
import usePhaseDuration from './usePhaseDuration'
import { isActivePhase } from '../services/timer'

export default (): number => {
  const secondsLeft = useSecondsLeft()
  const phase = usePhase()
  const phaseDuration = usePhaseDuration()

  if (!isActivePhase(phase)) {
    return 1
  }
  return (phaseDuration - secondsLeft) / phaseDuration
}
