import React from 'react'
import styled, { keyframes, css, ThemeProvider } from 'styled-components'
import ResetButton from './components/ResetButton'
import StartButton from './components/StartButton'
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
import * as timer from './timer'
import * as sounds from './sounds'

const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  position: relative;
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
`
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  z-index: 1; /* Put elements on top of completed-background */
`
const tickShine = keyframes`
  0% {
    opacity: 0.8;
  }
  10% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`
const TimeContainer = styled.div<{ state: States }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: stretch;
  margin-top: auto;
  height: 40vh;
  ${(props) => {
    switch (props.state) {
      case States.RUNNING:
        return css`
          animation: 1s ${tickShine} infinite;
        `
      case States.COMPLETED:
        return css`
          opacity: 1;
        `
      default:
        return css`
          transition: opacity 2s ease;
          opacity: 0.8;
        `
    }
  }}
`
const HintContainer = styled.div`
  display: flex;
  position: absolute;
  align-self: center;
  bottom: 0;
`
const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: stretch;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: auto;
`
const CreditsContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
`

const initialState = timer.getInitialState()

const App: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = React.useState(initialState.secondsLeft)
  const [isActive, setIsActive] = React.useState(initialState.isActive)
  const [isInitial, setIsInitial] = React.useState(initialState.isInitial)

  React.useEffect(() => {
    function tick() {
      setSecondsLeft(secondsLeft > 0 ? secondsLeft - 1 : 0)
    }
    let interval = -1
    if (isActive) {
      setIsInitial(false)
      interval = window.setInterval(tick, timer.milliSecondsPerSecond)
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval)
    }
    if (secondsLeft === 0) {
      timer.deleteStartDate()
      notification.showNotification('Done', { body: `Take a break for ${timer.breakMinutes} minutes` })
      sounds.playTimeOver()
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, secondsLeft, isInitial])

  function getState() {
    if (isInitial) {
      return States.INITIAL
    }
    if (secondsLeft === 0) {
      return States.COMPLETED
    }
    return States.RUNNING
  }
  function getProgress() {
    if (getState() === States.INITIAL) {
      return 1
    }
    return timer.getPercentage(secondsLeft)
  }
  function reset() {
    setSecondsLeft(timer.sessionSeconds)
    setIsActive(false)
    setIsInitial(true)
    timer.deleteStartDate()
  }
  function start(event?: React.MouseEvent) {
    // Init audio for iOS
    sounds.initOnInteraction(event)

    if (!notification.browserNotificationGranted() && notification.browserNotificationSupported()) {
      notification.askPermission().catch((error) => console.error(error))
    }

    if (getState() === States.COMPLETED) {
      reset()
    }
    setIsActive(true)
    timer.saveStartDate()
  }

  return (
    <AppContainer>
      <BackgroundOverlay state={getState()} />
      <CreditsContainer>
        <PictureCredits />
      </CreditsContainer>
      <MainContainer>
        <TimeContainer state={getState()}>
          <AnimatedCircle progress={getProgress()} />
          <Timer state={getState()} secondsLeft={secondsLeft} />
        </TimeContainer>
        <ControlsContainer>
          <Box mt={2}>
            {(getState() === States.RUNNING && <ResetButton state={getState()} reset={reset} />) || (
              <StartButton state={getState()} start={start} />
            )}
          </Box>
        </ControlsContainer>
        <HintContainer>
          <Hint state={getState()} breakMinutes={5} />
        </HintContainer>
      </MainContainer>
    </AppContainer>
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
