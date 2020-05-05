import React from 'react'

import IconButton from './IconButton'
import NotificationIcon from '../icons/NotificationIcon'
import NotificationIconInactive from '../icons/NotificationIconInactive'
import * as notifications from '../notifications'

type NotificationButtonProps = {
  className?: string
}

const NotificationButton: React.FC<NotificationButtonProps> = () => {
  const [isEnabled, setIsEnabled] = React.useState(notifications.isEnabled())
  React.useEffect(() => {
    notifications.setIsEnabled(isEnabled)
  }, [isEnabled])
  const onClick = () => {
    console.log('')
    if (
      !notifications.isEnabled() &&
      !notifications.browserNotificationGranted() &&
      notifications.browserNotificationSupported()
    ) {
      console.log('Ask Permission')
      notifications
        .askPermission()
        .then((granted) => setIsEnabled(true))
        .catch((error) =>
          alert(
            'If you want to enable notifications again, "Allow" notifications in the tool bar of your browser (to the left side of the address)'
          )
        )
    } else {
      setIsEnabled(!isEnabled)
    }
  }
  if (isEnabled) {
    return (
      <IconButton onClick={onClick} highlight title="Notification application">
        <NotificationIcon />
      </IconButton>
    )
  }
  return (
    <IconButton onClick={onClick} disabledLook title="Notification application">
      <NotificationIconInactive />
    </IconButton>
  )
}

export default NotificationButton
