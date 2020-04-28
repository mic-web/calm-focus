import React from 'react'
import styled, { keyframes, css, ThemeProvider } from 'styled-components'
import ResetButton from './components/ResetButton'
import StartButton from './components/StartButton'
import Background from './components/Background'
import Box from './components/Box'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import Hint from './components/Hint'
import GlobalStyle from './style/GlobalStyle'
import theme from './style/theme'
import { States } from './types'

const milliSecondsPerSecond = 1000
const sessionMinutes = 1
const sessionSeconds = sessionMinutes * 60 - 1

const AppContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  ${(props) => css`
    background: ${props.theme.colors.dark};
    background: ${props.theme.colors.darkGradient};
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
          opacity: 0.4;
        `
    }
  }}
`
const HintContainer = styled.div`
  display: flex;
  position: absolute;
  align-self: center;
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
  const [secondsLeft, setSecondsLeft] = React.useState(sessionSeconds)
  const [isActive, setIsActive] = React.useState(false)
  const [isInitial, setIsInitial] = React.useState(true)

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
    return () => {
      clearInterval(interval)
    }
  }, [isActive, secondsLeft])

  function getState() {
    if (isInitial) {
      return States.INITIAL
    }
    if (secondsLeft === 0) {
      return States.COMPLETED
    }
    if (!isActive) {
      return States.PAUSED
    }
    return States.RUNNING
  }
  function getProgress() {
    if (getState() === States.INITIAL) {
      return 1
    }
    return (sessionSeconds - secondsLeft) / sessionSeconds
  }
  function pause() {
    setIsActive(false)
  }
  function reset() {
    setSecondsLeft(sessionSeconds)
    setIsActive(false)
    setIsInitial(true)
  }
  function start() {
    if (getState() === States.COMPLETED) {
      reset()
    }
    setIsActive(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Background state={getState()} />
        <MainContainer>
          <TimeContainer state={getState()}>
            <AnimatedCircle progress={getProgress()} />
            <Timer state={getState()} secondsLeft={secondsLeft} />
          </TimeContainer>
          <ControlsContainer>
            <Box mt={2} className={{ alignItems: 'center' }}>
              <StartButton state={getState()} start={start} pause={pause} resume={start} />
            </Box>
            <Box mt={2}>
              <ResetButton state={getState()} reset={reset} />
            </Box>
          </ControlsContainer>
          <HintContainer>
            <Hint state={getState()} />
          </HintContainer>
        </MainContainer>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
