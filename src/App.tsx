import React from 'react'
import { ThemeProvider } from 'styled-components'
import ResetButton from './components/ResetButton'
import StartButton from './components/StartButton'
import InstallButton from './components/InstallButton'
import * as Container from './components/Containers'
import NotificationsButton from './components/NotificationsButton'
import BackgroundOverlay from './components/BackgroundOverlay'
import Box from './components/Box'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import Hint from './components/Hint'
import PictureCredits from './components/PictureCredits'
import GlobalStyle from './style/GlobalStyle'
import theme from './style/theme'
import { States } from './types'
import * as notification from './notifications'
import useInterval from './helpers/useInterval'
import * as timer from './timer'
import * as sounds from './sounds'
import * as storage from './storage'

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

const onInteraction = (event: React.SyntheticEvent) => {
  sounds.initOnInteraction(event)
}

const notifyTimeOver = (state: States) => {
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
  const timeOver = secondsLeft === 0
  const active = !timeOver && (state === States.WORK || state === States.REST)
  const activateState = React.useCallback((nextState) => {
    setState(nextState)
    storage.saveState(nextState)
    setSecondsLeft(timer.getPhaseSeconds(nextState))
    if (nextState === States.WORK || nextState === States.REST) {
      // Remember start date to allow refresh
      storage.saveStartDate()
    }
  }, [])
  React.useEffect(() => {
    if (secondsLeft === 0) {
      notifyTimeOver(state)
      sounds.playTimeOver()
      activateState(getNextState(state))
    }
  }, [state, secondsLeft, activateState])
  useInterval(
    () => setSecondsLeft((seconds) => seconds - 1),
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

  return (
    <Container.App>
      <BackgroundOverlay state={state} />
      <Container.Info>
        <PictureCredits />
      </Container.Info>
      <Container.Actions>
        <NotificationsButton />
        <InstallButton state={state} />
      </Container.Actions>
      <Container.Main>
        <Container.Time state={state}>
          <AnimatedCircle progress={getProgress()} />
          <Timer state={state} secondsLeft={secondsLeft} />
        </Container.Time>
        <Container.Controls>
          <Box mt={2}>{getControls(state, start, reset)}</Box>
        </Container.Controls>
        <Container.Hint>
          <Hint state={state} restMinutes={5} />
        </Container.Hint>
      </Container.Main>
    </Container.App>
  )
}

const ThemedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}

export default ThemedApp
