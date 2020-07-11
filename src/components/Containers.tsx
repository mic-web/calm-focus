import React from 'react'

import { Box } from '@material-ui/core'

export const AppContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    flex={1}
    alignItems="center"
    position="relative"
    minHeight="-webkit-fill-available"
  >
    {children}
  </Box>
)

export const MainContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="stretch"
    alignItems="stretch"
    marginTop="auto"
    marginBottom="auto"
    height="50vh"
    width="50vh"
    maxWidth="300px"
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
  <Box display="flex" position="relative" justifyContent="center" alignItems="center" flexShrink={0}>
    {children}
  </Box>
)

export const ControlContainer: React.FC = ({ children }) => (
  <Box display="flex" justifyContent="space-around" mr={1} ml={1} alignItems="center" flexDirection="column">
    {children}
  </Box>
)
