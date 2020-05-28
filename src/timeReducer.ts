import { Seconds, Phases, Timer, ActionMap } from './types'
import * as timer from './timer/timer'

export enum Types {
  UpdatePassedSeconds = 'UPDATE_PASSED_SECONDS',
  Reset = 'RESET_TIMER',
  UpdatePhase = 'UPDATE_PHASE',
  LoadData = 'LOAD_DATA',
}

type TimerPayload = {
  [Types.UpdatePassedSeconds]: {
    passedSeconds: Seconds
  }
  [Types.Reset]: {
    phaseDuration: Seconds
  }
  [Types.UpdatePhase]: {
    phase: Phases
  }
}

export type TimerActions = ActionMap<TimerPayload>[keyof ActionMap<TimerPayload>]

export const defaultState = {
  phase: Phases.WORK_READY,
  passedSeconds: 0,
  phaseSeconds: {
    [Phases.WORK]: timer.DEFAULT_WORK_PHASE_SECONDS,
    [Phases.REST]: timer.DEFAULT_REST_PHASE_SECONDS,
  },
}

export const timerReducer = (state: Timer, action: TimerActions): Timer => {
  switch (action.type) {
    case Types.Reset:
      return {
        ...state,
        phase: Phases.WORK_READY,
        passedSeconds: 0,
      }
    case Types.UpdatePassedSeconds:
      return {
        ...state,
        passedSeconds: action.payload.passedSeconds,
      }
    case Types.UpdatePhase:
      return {
        ...state,
        phase: action.payload.phase,
        passedSeconds: 0,
      }
    default:
      return state
  }
}
