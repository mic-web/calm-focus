import React from 'react'

import { Box, SvgIcon, Typography, Checkbox } from '@material-ui/core'
import Autorenew from '@material-ui/icons/Autorenew'
import useAutoPlayEnabled from '../../selectors/useAutoPlayEnabled'
import { AppContext } from '../../context/context'
import { TimerAction } from '../../context/timeReducer'
import * as storage from '../../services/storage'

const AutoRenewConfig: React.FC = () => {
  const { dispatch } = React.useContext(AppContext)
  const isEnabled = useAutoPlayEnabled()

  const toggle = React.useCallback(
    () =>
      dispatch({
        type: TimerAction.ToggleAutoPlay,
      }),
    [dispatch]
  )
  React.useEffect(() => {
    storage.saveAutoPlay(isEnabled)
  }, [isEnabled])
  return (
    <>
      <Box display="flex" alignItems="flex-start" flexDirection="column">
        <Box display="flex" alignItems="center" mb={2}>
          <SvgIcon>
            <Autorenew />
          </SvgIcon>
          <Box ml={2}>
            <Typography variant="h5">Auto-Play</Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="body1">When time is over, the next phase will be started directly.</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Checkbox size="small" checked={isEnabled} onChange={toggle} color="primary" />
          <Box ml={2}>
            <Typography variant="body1">{(isEnabled && 'Enabled') || 'Disabled'}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AutoRenewConfig
