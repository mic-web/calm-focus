import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import 'typeface-roboto'

import { AppContext, AppProvider } from './context'
import ResetButton from './components/ResetButton'
import StartButton from './components/StartButton'
import TickShine from './components/TickShine'
import BackgroundOverlay from './components/BackgroundOverlay'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './timer/TimerComponent'
import theme from './style/theme'
import GlobalStyle from './style/GlobalStyle'
import { Phases, Seconds } from './types'
import * as notification from './notification/notifications'
import * as timer from './timer/timer'
import * as sounds from './sound/sounds'
import * as storage from './storage'
import Hint from './components/Hint'
import Menu from './menu/Menu'
import MenuButton from './menu/MenuButton'
import {
  MainContainer,
  TimeContainer,
  ControlContainer,
  HintContainer,
  MenuContainer,
  MenuButtonContainer,
  AppContainer,
} from './components/Containers'

import * as webWorkers from './timer/web-workers'
import { Types } from './timeReducer'

const getNextPhase = (currentPhase: Phases) =>
  ({
    [Phases.WORK_READY]: Phases.WORK,
    [Phases.WORK]: Phases.REST_READY,
    [Phases.REST_READY]: Phases.REST,
    [Phases.REST]: Phases.WORK_READY,
  }[currentPhase])

const getControls = (
  phase: Phases,
  start: (e: React.SyntheticEvent) => void,
  reset: (event: React.SyntheticEvent) => void
) => {
  return {
    [Phases.WORK_READY]: <StartButton start={start} />,
    [Phases.REST_READY]: <StartButton start={start} />,
    [Phases.WORK]: <ResetButton reset={reset} />,
    [Phases.REST]: <ResetButton reset={reset} />,
  }[phase]
}

const onInteraction = (_event: React.SyntheticEvent) => {
  sounds.initOnInteraction()
}

const notifyTimeOver = (phase: Phases) => {
  sounds.playTimeOver()
  if (phase === Phases.WORK) {
    notification.showNotification('Done, take a break', {
      body: `Take a break for ${timer.DEFAULT_REST_PHASE_MINUTES} minutes`,
      icon: 'images/icon-192.png',
    })
  } else if (phase === Phases.REST) {
    notification.showNotification('Focus again', {
      body: `Focus again for ${timer.DEFAULT_WORK_PHASE_MINUTES} minutes`,
      icon: 'images/icon-192.png',
    })
  }
}

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { state, dispatch } = React.useContext(AppContext)
  const { phaseDurations, phase } = state.timer
  const phaseDuration = timer.usePhaseDuration()
  const secondsLeft = timer.useSecondsLeft()

  React.useEffect(() => {
    storage.savePhaseSeconds(phaseDurations)
  }, [phaseDurations])

  React.useEffect(() => {
    if (phase === Phases.WORK || phase === Phases.REST) {
      webWorkers.startTimer()
      const unsubscribe = webWorkers.subscribe((passedSeconds: Seconds) => {
        console.log('worker sub', passedSeconds)

        dispatch({ type: Types.UpdatePassedSeconds, payload: { passedSeconds } })
      })
      return unsubscribe
    }
    return undefined
  }, [phase, phaseDuration, dispatch])
  const activatePhase = React.useCallback(
    (nextPhase) => {
      dispatch({ type: Types.UpdatePhase, payload: { phase: nextPhase } })
    },
    [dispatch]
  )
  React.useEffect(() => {
    if (secondsLeft === 0) {
      notifyTimeOver(phase)
      activatePhase(getNextPhase(phase))
      webWorkers.stopTimer()
    }
  }, [phase, secondsLeft, activatePhase])
  function getProgress() {
    if (phase === Phases.REST_READY || phase === Phases.WORK_READY) {
      return 1
    }
    return timer.getPercentage(secondsLeft, phaseDuration)
  }
  function reset(event: React.SyntheticEvent) {
    onInteraction(event)
    activatePhase(Phases.WORK_READY)
    webWorkers.stopTimer()
  }
  function start(event: React.SyntheticEvent) {
    onInteraction(event)
    notification.checkNotificationsEnabled()
    activatePhase(getNextPhase(phase))
    webWorkers.startTimer()
  }
  function toggleMenu(event: React.SyntheticEvent) {
    onInteraction(event)
    setMenuOpen(!menuOpen)
  }

  return (
    <AppContainer>
      <BackgroundOverlay phase={phase} />
      <HintContainer>
        <Hint phase={phase} restMinutes={timer.DEFAULT_REST_PHASE_MINUTES} />
      </HintContainer>
      <MainContainer>
        <TimeContainer>
          <TickShine phase={phase}>
            <AnimatedCircle progress={getProgress()} phase={phase} />
            <Timer phase={phase} secondsLeft={secondsLeft} />
          </TickShine>
        </TimeContainer>
        <ControlContainer>{getControls(phase, start, reset)}</ControlContainer>
      </MainContainer>
      <MenuContainer open={menuOpen}>
        <Menu phase={phase} opened={menuOpen} close={() => setMenuOpen(false)} />
      </MenuContainer>
      <MenuButtonContainer>{!menuOpen && <MenuButton phase={phase} toggleMenu={toggleMenu} />}</MenuButtonContainer>
    </AppContainer>
  )
}

const ThemedApp = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppProvider>
  )
}

export default ThemedApp
