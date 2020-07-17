import React from 'react'

import { Box, SvgIcon, Typography } from '@material-ui/core'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import RestoreIcon from '@material-ui/icons/Restore'
import { DecreaseDuration, IncreaseDuration, PhaseDuration } from './DurationControls'
import { Phases } from '../../types'

const isMobile = (): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const DurationsConfigShortcuts: React.FC = () => {
  if (isMobile()) {
    return null
  }
  return (
    <Typography variant="body1">
      <em>Shortcut:</em>
      &nbsp; When menu is closed, press up / down on your keyboard.
    </Typography>
  )
}

export const WorkDurationConfig: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" mb={2}>
        <SvgIcon>
          <TimelapseIcon />
        </SvgIcon>
        <Box ml={2}>
          <Typography variant="h5">Focus Duration</Typography>
        </Box>
      </Box>
      <Typography variant="body1" component="div">
        <Box display="flex" alignItems="center">
          <DecreaseDuration phase={Phases.WORK} />
          <Box display="flex" justifyContent="center" ml={1} mr={1}>
            <PhaseDuration phase={Phases.WORK} />
          </Box>
          <IncreaseDuration phase={Phases.WORK} />
          <Box ml={1}>minutes</Box>
        </Box>
      </Typography>
      <Box mt={5}>
        <DurationsConfigShortcuts />
      </Box>
    </Box>
  )
}

export const RestDurationConfig: React.FC = () => (
  <>
    <Box display="flex" alignItems="center" mb={2}>
      <SvgIcon>
        <RestoreIcon />
      </SvgIcon>
      <Box ml={2}>
        <Typography variant="h5">Rest Duration</Typography>
      </Box>
    </Box>
    <Typography variant="body1" component="div">
      <Box display="flex" alignItems="center">
        <DecreaseDuration phase={Phases.REST} />
        <Box display="flex" justifyContent="center" ml={1} mr={1}>
          <PhaseDuration phase={Phases.REST} />
        </Box>
        <IncreaseDuration phase={Phases.REST} />
        <Box ml={1}>minutes</Box>
      </Box>
    </Typography>
  </>
)
