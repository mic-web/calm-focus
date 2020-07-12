import React from 'react'
import { ThemeProvider, CssBaseline, Box } from '@material-ui/core'

import { AppContext, AppProvider } from './context/context'
import PictureCredits from './components/PictureCredits'
import BackgroundOverlay from './components/BackgroundOverlay'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import theme from './style/theme'
import GlobalStyle from './style/GlobalStyle'
import { Phases } from './types'
import * as storage from './services/storage'
import Hint from './components/Hint'
import Menu, { MenuOpenButton, MenuContent } from './components/Menu'
import { MainContainer, TimeContainer, ControlContainer, HintContainer, AppContainer } from './components/Containers'

import useLeaveConfirmation from './hooks/useLeaveConfirmation'
import NotificationsConfig from './components/NotificationsConfig'
import SoundsConfig from './components/SoundsConfig'
import InstallButton from './components/InstallButton'
import Controls from './components/Controls'
import { useTimer } from './services/timer'
import DurationsConfig from './components/DurationsConfig'

const App: React.FC = () => {
  const { state } = React.useContext(AppContext)
  const { phaseDurations, phase } = state.timer
  useLeaveConfirmation(phase === Phases.REST || phase === Phases.WORK)
  useTimer()

  React.useEffect(() => {
    storage.savePhaseSeconds(phaseDurations)
  }, [phaseDurations])

  return (
    <AppContainer>
      <BackgroundOverlay phase={phase} />
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
      <Menu>
        <MenuContent>
          <Box mb={6}>
            <DurationsConfig.Work />
          </Box>
          <Box mb={4}>
            <DurationsConfig.Rest />
          </Box>
          <Box mb={6}>
            <DurationsConfig.Shortcuts phase={phase} />
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
        </MenuContent>
        <MenuOpenButton />
      </Menu>
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
