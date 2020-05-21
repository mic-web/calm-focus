import React from 'react'

import { Box, SvgIcon, Typography, Switch } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import * as notifications from '../notifications'

type Props = {}

const NotificationsConfig: React.FC<Props> = () => {
  const [isEnabled, setIsEnabled] = React.useState(notifications.readIsEnabled())
  React.useEffect(() => {
    notifications.writeIsEnabled(isEnabled)
    if (isEnabled) {
      notifications.showNotification('Notifications enabled', {
        body: `This is an example notification`,
        icon: 'images/icon-192.png',
      })
    }
  }, [isEnabled])
  const onToggle = () => {
    if (
      !notifications.readIsEnabled() &&
      !notifications.browserNotificationGranted() &&
      notifications.browserNotificationSupported()
    ) {
      notifications
        .askPermission()
        .then((granted) => {
          if (granted) {
            setIsEnabled(true)
          } else {
            setIsEnabled(false)
          }
        })
        .catch(() => {
          setIsEnabled(false)
          console.warn('Notification permission failed')
          alert(
            'If you want to enable notifications again, "Allow" notifications in the tool bar of your browser (to the left side of the address)'
          )
        })
    } else if (!isEnabled && notifications.browserNotificationSupported()) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  }
  return (
    <>
      <Box display="flex" alignItems="flex-start" flexDirection="column">
        <Box display="flex" alignItems="center" mb={2}>
          <SvgIcon>
            <NotificationsIcon />
          </SvgIcon>
          <Box ml={2}>
            <Typography variant="h5">Notifications</Typography>
          </Box>
        </Box>
        {notifications.browserNotificationSupported() ? (
          <>
            <Box mb={2}>
              <Typography variant="body1">Get notified when time is over.</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Switch size="small" checked={isEnabled} onChange={onToggle} color="primary" />
              <Box ml={2}>
                <Typography variant="body1">
                  {(isEnabled && 'Notifications enabled') || 'Notifications disabled'}
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Box mb={2}>
            <Typography variant="body1">Browser notifications are not supported on this browser / device</Typography>
          </Box>
        )}
      </Box>
    </>
  )
}

export default NotificationsConfig
