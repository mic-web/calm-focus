import React from 'react'

import { Box, SvgIcon, Typography, Switch } from '@material-ui/core'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import * as sounds from './sounds'

type Props = {}

const SoundsConfig: React.FC<Props> = () => {
  const [isEnabled, setIsEnabled] = React.useState(sounds.readIsEnabled())
  const onToggle = () => {
    if (!sounds.readIsEnabled()) {
      sounds.writeIsEnabled(true)
      sounds.playTimeOver()
      setIsEnabled(true)
    } else {
      sounds.writeIsEnabled(false)
      setIsEnabled(false)
    }
  }
  return (
    <>
      <Box display="flex" alignItems="flex-start" flexDirection="column">
        <Box display="flex" alignItems="center" mb={2}>
          <SvgIcon>
            <VolumeDownIcon />
          </SvgIcon>
          <Box ml={2}>
            <Typography variant="h5">Sounds</Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">When time is over, a sound is played.</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Switch size="small" checked={isEnabled} onChange={onToggle} color="primary" />
          <Box ml={2}>
            <Typography variant="body1">{(isEnabled && 'Enabled') || 'Disabled'}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SoundsConfig
