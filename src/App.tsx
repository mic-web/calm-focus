import React from 'react'

import { ThemeProvider, CssBaseline } from '@material-ui/core'
import ResetButton from './components/ResetButton'
import StartButton from './components/StartButton'
import TickShine from './components/TickShine'
import BackgroundOverlay from './components/BackgroundOverlay'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import theme from './style/theme'
import GlobalStyle from './style/GlobalStyle'
import { States } from './types'
import * as notification from './notifications'
import useInterval from './helpers/useInterval'
import * as timer from './timer'
import * as sounds from './sounds'
import * as storage from './storage'
import 'typeface-roboto'
import Hint from './components/Hint'
import Menu from './components/Menu'
import MenuButton from './components/MenuButton'
import {
  MainContainer,
  TimeContainer,
  ControlContainer,
  HintContainer,
  MenuContainer,
  MenuButtonContainer,
  AppContainer,
} from './components/Containers'

const initialState = timer.getInitialState()
const getNextState = (currentState: States) =>
  ({
    [States.WORK_READY]: States.WORK,
    [States.WORK]: States.REST_READY,
    [States.REST_READY]: States.REST,
    [States.REST]: States.WORK_READY,
  }[currentState])

const getControls = (
  state: States,
  start: (e: React.SyntheticEvent) => void,
  reset: (event: React.SyntheticEvent) => void
) => {
  return {
    [States.WORK_READY]: <StartButton start={start} />,
    [States.REST_READY]: <StartButton start={start} />,
    [States.WORK]: <ResetButton reset={reset} />,
    [States.REST]: <ResetButton reset={reset} />,
  }[state]
}

const onInteraction = (_event: React.SyntheticEvent) => {
  sounds.initOnInteraction()
}

const notifyTimeOver = (state: States) => {
  sounds.playTimeOver()
  if (state === States.WORK) {
    notification.showNotification('Done, take a break', {
      body: `Take a break for ${timer.REST_PHASE_MINUTES} minutes`,
      icon: 'images/icon-192.png',
    })
  } else if (state === States.REST) {
    notification.showNotification('Focus again', {
      body: `Focus again for ${timer.WORK_PHASE_MINUTES} minutes`,
      icon: 'images/icon-192.png',
    })
  }
}

const App: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = React.useState(initialState.secondsLeft)
  const [state, setState] = React.useState(initialState.state)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const timeOver = secondsLeft === 0
  const active = !timeOver && (state === States.WORK || state === States.REST)
  const activateState = React.useCallback((nextState) => {
    setState(nextState)
    storage.saveState(nextState)
    setSecondsLeft(timer.getPhaseSeconds(nextState))
    if (nextState === States.WORK || nextState === States.REST) {
      // Remember start date to allow refresh
      storage.saveStartDate()
    } else {
      storage.deleteStartDate()
    }
  }, [])
  // React.useEffect(() => {
  //   const sub = webWorkers.subscribe((passedSeconds: Seconds) => {
  //     console.log('In App: passedSeconds', passedSeconds)
  //   })
  //   return sub.dispose
  // }, [])
  React.useEffect(() => {
    console.log('secondsLeft: ', secondsLeft)
    if (secondsLeft === 0) {
      notifyTimeOver(state)
      activateState(getNextState(state))
      // webWorkers.stopTimer()
    }
  }, [state, secondsLeft, activateState])
  useInterval(
    () => {
      setSecondsLeft((seconds) => seconds - 1)
      console.log('tick - seconsLeft: ', secondsLeft - 1)
    },
    !timeOver && !active ? null : timer.MILLISECONDS_PER_SECOND
  )
  function getProgress() {
    if (state === States.REST_READY || state === States.WORK_READY) {
      return 1
    }
    return timer.getPercentage(secondsLeft, timer.getPhaseSeconds(state))
  }
  function reset(event: React.SyntheticEvent) {
    onInteraction(event)
    activateState(States.WORK_READY)
  }
  function start(event: React.SyntheticEvent) {
    onInteraction(event)
    notification.checkNotificationsEnabled()
    activateState(getNextState(state))
  }
  function toggleMenu(event: React.SyntheticEvent) {
    onInteraction(event)
    setMenuOpen(!menuOpen)
  }

  return (
    <AppContainer>
      <BackgroundOverlay state={state} />
      <HintContainer>
        <Hint state={state} restMinutes={timer.REST_PHASE_MINUTES} />
      </HintContainer>
      <MainContainer>
        <TimeContainer>
          <TickShine state={state}>
            <AnimatedCircle progress={getProgress()} state={state} />
            <Timer state={state} secondsLeft={secondsLeft} />
          </TickShine>
        </TimeContainer>
        <ControlContainer>{getControls(state, start, reset)}</ControlContainer>
      </MainContainer>
      {menuOpen && (
        <MenuContainer>
          <Menu state={state} opened={menuOpen} close={() => setMenuOpen(false)} />
        </MenuContainer>
      )}
      <MenuButtonContainer>{!menuOpen && <MenuButton state={state} toggleMenu={toggleMenu} />}</MenuButtonContainer>
    </AppContainer>
  )
}

const ThemedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

export default ThemedApp
