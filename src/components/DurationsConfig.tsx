import React from 'react'

import { Box, SvgIcon, Typography } from '@material-ui/core'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import RestoreIcon from '@material-ui/icons/Restore'
import { DecreaseDuration, IncreaseDuration, PhaseDuration } from './DurationControls'
import { Phases } from '../types'

type Props = {}

const WorkDurationConfig: React.FC<Props> = () => (
  <>
    <Box display="flex" alignItems="center" mb={2}>
      <SvgIcon>
        <TimelapseIcon />
      </SvgIcon>
      <Box ml={2}>
        <Typography variant="h5">Focus Minutes</Typography>
      </Box>
    </Box>
    <Typography variant="body1" component="div">
      <Box display="flex" alignItems="center">
        <DecreaseDuration phase={Phases.WORK} />
        <Box display="flex" justifyContent="center" ml={1} mr={1}>
          <PhaseDuration phase={Phases.WORK} />
        </Box>
        <IncreaseDuration phase={Phases.WORK} />
      </Box>
    </Typography>
  </>
)

const RestDurationConfig: React.FC<Props> = () => (
  <>
    <Box display="flex" alignItems="center" mb={2}>
      <SvgIcon>
        <RestoreIcon />
      </SvgIcon>
      <Box ml={2}>
        <Typography variant="h5">Rest Minutes</Typography>
      </Box>
    </Box>
    <Typography variant="body1" component="div">
      <Box display="flex" alignItems="center">
        <DecreaseDuration phase={Phases.REST} />
        <Box display="flex" justifyContent="center" ml={1} mr={1}>
          <PhaseDuration phase={Phases.REST} />
        </Box>
        <IncreaseDuration phase={Phases.REST} />
      </Box>
    </Typography>
  </>
)

export default {
  Work: WorkDurationConfig,
  Rest: RestDurationConfig,
}
