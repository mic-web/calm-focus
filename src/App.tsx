import React from 'react'
import { ThemeProvider, CssBaseline, Box } from '@material-ui/core'

import { AppProvider, AppContext } from './context/context'
import PictureCredits from './components/PictureCredits'
import BackgroundOverlay from './components/BackgroundOverlay'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import theme from './style/theme'
import GlobalStyle from './style/GlobalStyle'
import { Phases } from './types'
import Hint from './components/Hint'
import { MenuContent, MenuOpenButton, MenuProvider, useMenuContext } from './components/Menu'
import { MainContainer, TimeContainer, ControlContainer, HintContainer, AppContainer } from './components/Containers'

import useLeaveConfirmation from './hooks/useLeaveConfirmation'
import NotificationsConfig from './components/NotificationsConfig'
import SoundsConfig from './components/SoundsConfig'
import InstallButton from './components/InstallButton'
import Controls from './components/Controls'
import { useTimer, narrowEditablePhase } from './services/timer'
import { DurationsConfigShortcuts, WorkDurationConfig, RestDurationConfig } from './components/DurationsConfig'
import { useDecreaseMinutes, useIncreaseMinutes } from './selectors/useUpdateMinutes'
import useKeyboardEvent from './hooks/useKeyboardEvent'
import * as storage from './services/storage'
import ErrorBoundary from './components/ErrorBoundary'

const AppWideBehavior: React.FC = () => {
  const { state } = React.useContext(AppContext)
  const { phaseDurations, phase } = state.timer
  const { open, setOpen } = useMenuContext()

  const decrease = useDecreaseMinutes(narrowEditablePhase(phase))
  const increase = useIncreaseMinutes(narrowEditablePhase(phase))
  useKeyboardEvent('keydown', 'ArrowUp', increase, !open)
  useKeyboardEvent('keydown', 'ArrowDown', decrease, !open)

  const closeMenu = React.useCallback(() => setOpen(false), [setOpen])
  useKeyboardEvent('keyup', 'Escape', closeMenu, open)

  useTimer()
  useLeaveConfirmation(phase === Phases.REST || phase === Phases.WORK)

  React.useEffect(() => {
    storage.savePhaseSeconds(phaseDurations)
  }, [phaseDurations])

  return null
}

const Menu = () => (
  <>
    <Box mb={6}>
      <WorkDurationConfig />
    </Box>
    <Box mb={4}>
      <RestDurationConfig />
    </Box>
    <Box mb={6}>
      <DurationsConfigShortcuts />
    </Box>
    <Box mb={6}>
      <SoundsConfig />
    </Box>
    <Box mb={6}>
      <NotificationsConfig />
    </Box>
    <Box mb={6}>
      <InstallButton />
    </Box>
    <Box mt="auto">
      <PictureCredits />
    </Box>
  </>
)

const ThemedApp = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <AppProvider>
          <MenuProvider>
            <AppWideBehavior />
            <AppContainer>
              <BackgroundOverlay />
              <HintContainer>
                <Hint />
              </HintContainer>
              <MainContainer>
                <TimeContainer>
                  <AnimatedCircle />
                  <Timer />
                </TimeContainer>
                <ControlContainer>
                  <Controls />
                </ControlContainer>
              </MainContainer>
              <MenuContent>
                <Menu />
              </MenuContent>
              <MenuOpenButton />
            </AppContainer>
          </MenuProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default ThemedApp
