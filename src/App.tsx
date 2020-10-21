import React from 'react'
import { ThemeProvider, CssBaseline, Box } from '@material-ui/core'

import { AppProvider, AppContext } from './context/context'
import PictureCredits from './components/Credits'
import BackgroundOverlay from './components/BackgroundOverlay'
import AnimatedCircle from './components/AnimatedCircle'
import Timer from './components/Timer'
import theme, { AppThemeProvider } from './style/theme'
import GlobalStyle from './style/GlobalStyle'
import Hint from './components/Hint'
import { MenuContent, MenuOpenButton, MenuProvider, useMenuContext } from './components/Menu'
import { MainContainer, TimeContainer, ControlContainer, HintContainer, AppContainer } from './components/Containers'

import useLeaveConfirmation from './hooks/useLeaveConfirmation'
import NotificationsConfig from './components/menu/NotificationsConfig'
import SoundsConfig from './components/menu/SoundsConfig'
import AutoPlayConfig from './components/menu/AutoPlayConfig'
import Controls from './components/PlayControls'
import { useTimer, narrowEditablePhase, isActivePhase } from './services/timer'
import { WorkDurationConfig, RestDurationConfig } from './components/menu/DurationsConfig'
import { useDecreaseMinutes, useIncreaseMinutes } from './selectors/useUpdateMinutes'
import useKeyboardEvent from './hooks/useKeyboardEvent'
import * as storage from './services/storage'
import ErrorBoundary from './components/ErrorBoundary'
import { ServiceWorkerProvider } from './services/ServiceWorkerProvider'
import { NotificationProvider } from './services/NotificationsProvider'
import { SoundProvider } from './services/SoundProvider'

const AppWideBehavior: React.FC = () => {
  const { state } = React.useContext(AppContext)
  const { phaseDurations, phase } = state.timer
  const { open, setOpen } = useMenuContext()

  const decrease = useDecreaseMinutes(narrowEditablePhase(phase))
  const increase = useIncreaseMinutes(narrowEditablePhase(phase))
  useKeyboardEvent('keydown', 'ArrowUp', increase, !open)
  useKeyboardEvent('keydown', 'ArrowDown', decrease, !open)

  const closeMenu = React.useCallback(() => setOpen(false), [setOpen])
  const toggleMenu = React.useCallback(() => setOpen(!open), [setOpen, open])
  useKeyboardEvent('keyup', 'Escape', closeMenu, open)
  useKeyboardEvent('keyup', 'm', toggleMenu)

  useTimer()
  useLeaveConfirmation(isActivePhase(phase))

  React.useEffect(() => {
    storage.savePhaseSeconds(phaseDurations)
  }, [phaseDurations])

  return null
}

const Menu = () => {
  const MenuEntry: React.FC = ({ children }) => (
    <Box mb={10} flexBasis="45%" minWidth="230px">
      {children}
    </Box>
  )
  return (
    <>
      <MenuEntry>
        <WorkDurationConfig />
      </MenuEntry>
      <MenuEntry>
        <RestDurationConfig />
      </MenuEntry>
      <MenuEntry>
        <AutoPlayConfig />
      </MenuEntry>
      <MenuEntry>
        <SoundsConfig />
      </MenuEntry>
      <MenuEntry>
        <NotificationsConfig />
      </MenuEntry>
      <MenuEntry>
        <PictureCredits />
      </MenuEntry>
    </>
  )
}

const ThemedApp = () => {
  return (
    <ErrorBoundary>
      <AppThemeProvider>
        <AppProvider>
          <ServiceWorkerProvider>
            <NotificationProvider>
              <SoundProvider>
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
              </SoundProvider>
            </NotificationProvider>
          </ServiceWorkerProvider>
        </AppProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  )
}

export default ThemedApp
