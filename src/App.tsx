import React from 'react'
import styled, { keyframes, css, ThemeProvider } from 'styled-components'
import ResetButton from './components/ResetButton'
import StartButton from './components/StartButton'
import BackgroundOverlay from './components/BackgroundOverlay'
import Box from './components/Box'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import Hint from './components/Hint'
import GlobalStyle from './style/GlobalStyle'
import theme from './style/theme'
import { States } from './types'
import notification from './notification'

const milliSecondsPerSecond = 1000
const sessionMinutes = 0.05
const sessionSeconds = sessionMinutes * 60 - 1
const breakMinutes = 5

const startDateKey = 'startDate'
const saveStartDate = () => window.localStorage.setItem(startDateKey, new Date().toString())
const deleteStartDate = () => window.localStorage.removeItem(startDateKey)

const getSavedSeconds = (): number | null => {
  const savedStartDate = window.localStorage.getItem(startDateKey)
  if (!savedStartDate) {
    return null
  }
  const passedSeconds = (new Date().getTime() - new Date(savedStartDate).getTime()) / 1000
  const remainingSeconds = Math.round(sessionSeconds - passedSeconds)
  if (remainingSeconds < 0) {
    deleteStartDate()
    return null
  }
  return remainingSeconds
}
let initialSeconds = getSavedSeconds()
const wasActive = initialSeconds !== null
const wasInitial = initialSeconds === null
if (!initialSeconds) {
  initialSeconds = sessionSeconds
}

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

const App: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds)
  const [isActive, setIsActive] = React.useState(wasActive)
  const [isInitial, setIsInitial] = React.useState(wasInitial)

  React.useEffect(() => {
    function tick() {
      setSecondsLeft(secondsLeft > 0 ? secondsLeft - 1 : 0)
    }
    let interval = -1
    if (isActive) {
      setIsInitial(false)
      interval = window.setInterval(tick, milliSecondsPerSecond)
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval)
    }
    if (secondsLeft === 0) {
      deleteStartDate()
      if (!document.hasFocus()) {
        notification.showNotification('Done', `Take a break for ${breakMinutes} minutes`)
      }
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
    return (sessionSeconds - secondsLeft) / sessionSeconds
  }
  function reset() {
    setSecondsLeft(sessionSeconds)
    setIsActive(false)
    setIsInitial(true)
    deleteStartDate()
  }
  function start() {
    if (!notification.isGranted() && notification.checkAvailability()) {
      notification.askPermission().catch((error) => console.error(error))
    }

    if (getState() === States.COMPLETED) {
      reset()
    }
    setIsActive(true)
    saveStartDate()
  }

  return (
    <AppContainer>
      <BackgroundOverlay state={getState()} />
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
