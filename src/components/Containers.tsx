import React from 'react'

import { Box, useMediaQuery } from '@material-ui/core'

export const AppContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="stretch"
    alignItems="center"
    position="relative"
    minHeight="-webkit-fill-available"
    flex={1}
    overflow="hidden auto"
  >
    {children}
  </Box>
)

export const MainContainer: React.FC = ({ children }) => {
  const isSmall = useMediaQuery('(max-height:  400px), (max-width: 400px)')
  const size = isSmall ? '200px' : '300px'
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="stretch"
      alignItems="stretch"
      marginTop="auto"
      marginBottom="auto"
      width={size}
      height={size}
    >
      {children}
    </Box>
  )
}

export const HintContainer: React.FC = ({ children }) => (
  <Box display="flex" width="100%">
    {children}
  </Box>
)

export const TimeContainer: React.FC = ({ children }) => (
  <Box display="flex" position="relative" justifyContent="center" alignItems="stretch" minHeight="0" flex="1">
    {children}
  </Box>
)

export const ControlContainer: React.FC = ({ children }) => (
  <Box
    display="flex"
    justifyContent="space-around"
    mr={1}
    ml={1}
    alignItems="center"
    flexDirection="column"
    flexShrink="0"
  >
    {children}
  </Box>
)
