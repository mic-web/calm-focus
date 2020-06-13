import React from 'react'

import { Box } from '@material-ui/core'

export const AppContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="stretch"
    position="relative"
    height="100%"
    minHeight="-webkit-fill-available"
  >
    {children}
  </Box>
)

export const MainContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    marginTop="auto"
    marginBottom="auto"
  >
    {children}
  </Box>
)

export const HintContainer: React.FC = ({ children }) => (
  <Box display="flex" width="100%">
    {children}
  </Box>
)

export const TimeContainer: React.FC = ({ children }) => (
  <Box display="flex" justifyContent="stretch" position="relative" alignItems="stretch" height="30vh">
    {children}
  </Box>
)

export const ControlContainer: React.FC = ({ children }) => (
  <Box display="flex" justifyContent="space-around" mr={1} ml={1} alignItems="stretch" flexDirection="column">
    {children}
  </Box>
)
