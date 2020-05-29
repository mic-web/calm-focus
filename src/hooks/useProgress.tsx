import useSecondsLeft from './useSecondsLeft'
import usePhase from './usePhase'
import usePhaseDuration from './usePhaseDuration'
import { Phases } from '../types'

export default (): number => {
  const secondsLeft = useSecondsLeft()
  const phase = usePhase()
  const phaseDuration = usePhaseDuration()

  if (phase === Phases.REST_READY || phase === Phases.WORK_READY) {
    return 1
  }
  return (phaseDuration - secondsLeft) / phaseDuration
}
