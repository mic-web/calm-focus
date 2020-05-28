import * as serviceWorker from '../service-worker'

export const browserNotificationSupported = () => !!window.Notification

let granted = false

const notificationsEnabledKey = 'notificationsEnabled'
if (
  browserNotificationSupported() &&
  !window.localStorage.getItem(notificationsEnabledKey) &&
  window.Notification.permission !== 'denied'
) {
  window.localStorage.setItem(notificationsEnabledKey, 'true')
}

export const readIsEnabled = () => window.localStorage.getItem(notificationsEnabledKey) === 'true'

export const askPermission = () => {
  if (!browserNotificationSupported()) {
    return Promise.reject(new Error('Notifications not available'))
  }
  return new Promise((resolve, reject) => {
    const permissionResult = window.Notification.requestPermission((result) => {
      resolve(result)
    })

    if (permissionResult) {
      permissionResult.then(resolve, reject)
    }
  }).then((permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.")
    }
    granted = true
    return true
  })
}

export const browserNotificationGranted = () => granted

export const showNotification = (title: string, options: NotificationOptions) => {
  if (readIsEnabled()) {
    if (serviceWorker.isSwSupported() && serviceWorker.isReady()) {
      serviceWorker.showNotification(title, options)
    } else if (browserNotificationSupported() && browserNotificationGranted()) {
      const notification = new window.Notification(title, options)
      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    }
  }
}

export const writeIsEnabled = (isEnabled: boolean) => {
  window.localStorage.setItem(notificationsEnabledKey, `${isEnabled}`)
}

export const checkNotificationsEnabled = () => {
  if (readIsEnabled() && !browserNotificationGranted() && browserNotificationSupported()) {
    askPermission().catch((error) => console.error(error))
  }
}
