import { Seconds, Phases, TimerState, ActionMap } from '../types'

export enum TimerAction {
  UpdatePassedSeconds = 'UPDATE_PASSED_SECONDS',
  Reset = 'RESET_TIMER',
  UpdatePhase = 'UPDATE_PHASE',
  UpdatePhaseSeconds = 'UPDATE_PHASE_SECONDS',
  ToggleAutoPlay = 'TOGGLE_AUTO_PLAY',
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
    autoPlayStarted?: boolean
  }
  [TimerAction.UpdatePhaseSeconds]: {
    phase: Phases
    seconds: Seconds
  }
  [TimerAction.ToggleAutoPlay]: undefined
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
        autoPlayStarted: action.payload.autoPlayStarted ?? state.autoPlayStarted,
      }
    case TimerAction.UpdatePhaseSeconds:
      return {
        ...state,
        phaseDurations: {
          ...state.phaseDurations,
          [action.payload.phase]: action.payload.seconds,
        },
      }
    case TimerAction.ToggleAutoPlay:
      return {
        ...state,
        autoPlay: !state.autoPlay,
        autoPlayStarted: state.autoPlay && state.autoPlayStarted,
      }
    default:
      return state
  }
}
