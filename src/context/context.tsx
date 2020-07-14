import React, { createContext, useReducer, Dispatch } from 'react'
import { timerReducer, TimerActions } from './timeReducer'
import { AppState, Phases } from '../types'
import * as timeService from '../services/timer'

const phaseSeconds = timeService.initPhaseSeconds()

const initialState: AppState = {
  timer: {
    phase: Phases.WORK_READY,
    phaseDurations: phaseSeconds,
    passedSeconds: 0,
  },
}

const AppContext = createContext<{
  state: AppState
  dispatch: Dispatch<TimerActions>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = ({ timer }: AppState, action: TimerActions) => ({
  timer: timerReducer(timer, action as TimerActions),
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }
