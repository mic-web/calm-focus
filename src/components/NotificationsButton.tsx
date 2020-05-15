import React from 'react'
import styled from 'styled-components'

import { IconButton, Box, SvgIcon } from '@material-ui/core'
import NotificationIcon from '../icons/NotificationIcon'
import NotificationIconInactive from '../icons/NotificationIconInactive'
import * as notifications from '../notifications'

type NotificationButtonProps = {
  className?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const NotificationButton: React.FC<NotificationButtonProps> = () => {
  const [isEnabled, setIsEnabled] = React.useState(notifications.isEnabled())
  React.useEffect(() => {
    notifications.setIsEnabled(isEnabled)
  }, [isEnabled])
  const onClick = () => {
    if (
      !notifications.isEnabled() &&
      !notifications.browserNotificationGranted() &&
      notifications.browserNotificationSupported()
    ) {
      notifications
        .askPermission()
        .then((granted) => setIsEnabled(true))
        .catch(() => {
          console.warn('Notification permission failed')
          alert(
            'If you want to enable notifications again, "Allow" notifications in the tool bar of your browser (to the left side of the address)'
          )
        })
    } else {
      setIsEnabled(!isEnabled)
    }
  }
  if (isEnabled) {
    return (
      <Container>
        <IconButton onClick={onClick} title="Notification application">
          <SvgIcon>
            <NotificationIcon />
          </SvgIcon>
          <Box ml={2}>Notifications enabled</Box>
        </IconButton>
      </Container>
    )
  }
  return (
    <Container>
      <IconButton onClick={onClick} title="Notification application">
        <NotificationIconInactive />
        <SvgIcon>
          <Box ml={2}>Notifications disabled</Box>
        </SvgIcon>
      </IconButton>
    </Container>
  )
}

export default NotificationButton
