import { Seconds, Phases, Timer, ActionMap } from '../types'

export enum Types {
  UpdatePassedSeconds = 'UPDATE_PASSED_SECONDS',
  Reset = 'RESET_TIMER',
  UpdatePhase = 'UPDATE_PHASE',
  LoadData = 'LOAD_DATA',
  UpdatePhaseSeconds = 'UPDATE_PHASE_SECONDS',
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
  [Types.UpdatePhaseSeconds]: {
    phase: Phases
    seconds: Seconds
  }
}

export type TimerActions = ActionMap<TimerPayload>[keyof ActionMap<TimerPayload>]

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
    case Types.UpdatePhaseSeconds:
      return {
        ...state,
        phaseDurations: {
          ...state.phaseDurations,
          [action.payload.phase]: action.payload.seconds,
        },
      }
    default:
      return state
  }
}
