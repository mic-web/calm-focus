import serviceWorker from './service-worker'

export const browserNotificationSupported = () => {
  console.log('Browser notification available?', !!window.Notification)
  return !!window.Notification
}

let granted = false

export const askPermission = () => {
  if (!browserNotificationSupported()) {
    return Promise.reject(new Error('Notifications not available'))
  }
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
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
  })
}

export const browserNotificationGranted = () => granted

export const showNotification = (title: string, options: NotificationOptions) => {
  if (serviceWorker.isSupported() && serviceWorker.isReady()) {
    console.log('Show service worker notification')
    serviceWorker.showNotification(title, options)
  } else if (browserNotificationGranted() && browserNotificationSupported()) {
    console.log('Show browser notification')
    const notification = new Notification(title, options)
    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }
}
