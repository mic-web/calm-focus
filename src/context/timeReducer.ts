import { Seconds, Phases, TimerState, ActionMap } from '../types'

export enum TimerAction {
  UpdatePassedSeconds = 'UPDATE_PASSED_SECONDS',
  Reset = 'RESET_TIMER',
  UpdatePhase = 'UPDATE_PHASE',
  LoadData = 'LOAD_DATA',
  UpdatePhaseSeconds = 'UPDATE_PHASE_SECONDS',
}

type TimerPayload = {
  [TimerAction.UpdatePassedSeconds]: {
    passedSeconds: Seconds
  }
  [TimerAction.Reset]: {
    phaseDuration: Seconds
  }
  [TimerAction.UpdatePhase]: {
    phase: Phases
  }
  [TimerAction.UpdatePhaseSeconds]: {
    phase: Phases
    seconds: Seconds
  }
}

export type TimerActions = ActionMap<TimerPayload>[keyof ActionMap<TimerPayload>]

export const timerReducer = (state: TimerState, action: TimerActions): TimerState => {
  switch (action.type) {
    case TimerAction.Reset:
      return {
        ...state,
        phase: Phases.WORK_READY,
        passedSeconds: 0,
      }
    case TimerAction.UpdatePassedSeconds:
      return {
        ...state,
        passedSeconds: action.payload.passedSeconds,
      }
    case TimerAction.UpdatePhase:
      return {
        ...state,
        phase: action.payload.phase,
        passedSeconds: 0,
      }
    case TimerAction.UpdatePhaseSeconds:
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
