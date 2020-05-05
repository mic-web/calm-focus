const isNotificationAvailable = () => {
  console.log('Notification available?', !!window.Notification)
  return !!window.Notification
}

let granted = false

function askPermission() {
  if (!isNotificationAvailable()) {
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

const isGranted = () => granted

const showNotification = (title: string, body: string, icon?: string) => {
  if (isGranted() && isNotificationAvailable()) {
    const notification = new Notification(title, {
      body,
      icon,
    })
    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }
}

export default {
  isNotificationAvailable,
  askPermission,
  isGranted,
  showNotification,
}
