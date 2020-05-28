import React, { createContext, useReducer, Dispatch } from 'react'
import { timerReducer, TimerActions } from './timeReducer'
import { StateType, Phases } from './types'
import * as timer from './timer/timer'

const phaseSeconds = timer.initPhaseSeconds()

const initialState: StateType = {
  timer: {
    phase: Phases.WORK_READY,
    phaseDurations: phaseSeconds,
    passedSeconds: 0,
  },
}

const AppContext = createContext<{
  state: StateType
  dispatch: Dispatch<TimerActions>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = ({ timer: products }: StateType, action: TimerActions) => ({
  timer: timerReducer(products, action),
})

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }
