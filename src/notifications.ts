import serviceWorker from './service-worker'

const browserNotificationSupported = () => {
  console.log('Notification available?', !!window.Notification)
  return !!window.Notification
}

let granted = false

function askPermission() {
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

const browserNotificationGranted = () => granted

const showNotification = (title: string, options: NotificationOptions) => {
  if (serviceWorker.isSupported() && serviceWorker.isReady()) {
    serviceWorker.showNotification(title, options)
  } else if (browserNotificationGranted() && browserNotificationSupported()) {
    const notification = new Notification(title, options)
    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }
}

export default {
  isNotificationAvailable: browserNotificationSupported,
  askPermission,
  isGranted: browserNotificationGranted,
  showNotification,
}
