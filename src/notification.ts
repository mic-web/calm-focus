const checkAvailability = () => {
  if (!window.Notification) {
    return false
  }

  return true
}

let granted = false

function askPermission() {
  if (!checkAvailability()) {
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
  if (isGranted() && checkAvailability()) {
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
  checkAvailability,
  askPermission,
  isGranted,
  showNotification,
}
