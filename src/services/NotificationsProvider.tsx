import React from 'react'
import ServiceWorkerManager, { useServiceWorkerManager } from './ServiceWorkerProvider'

export class NotificationManager {
  private _granted = false

  private _notificationsEnabledKey = 'notificationsEnabled'

  private _serviceWorker: ServiceWorkerManager

  constructor(serviceWorkerManager: ServiceWorkerManager) {
    this._serviceWorker = serviceWorkerManager
    if (
      this.supportedByBrowser() &&
      !window.localStorage.getItem(this._notificationsEnabledKey) &&
      window.Notification.permission !== 'denied'
    ) {
      window.localStorage.setItem(this._notificationsEnabledKey, 'true')
    }
  }

  public supportedByBrowser = () => !!window.Notification

  public readIsEnabled = () => window.localStorage.getItem(this._notificationsEnabledKey) === 'true'

  public askPermission = () => {
    if (!this.supportedByBrowser()) {
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
      this._granted = true
      return true
    })
  }

  get grantedByUser(): boolean {
    return this._granted
  }

  public showNotification = (title: string, options: NotificationOptions) => {
    if (this.readIsEnabled()) {
      if (this._serviceWorker.isSwSupported() && this._serviceWorker.isReady && this._serviceWorker.showNotification) {
        this._serviceWorker.showNotification(title, options)
      } else if (this.supportedByBrowser() && this.grantedByUser) {
        const notification = new window.Notification(title, options)
        notification.onclick = () => {
          window.focus()
          notification.close()
        }
      }
    }
  }

  public writeIsEnabled = (isEnabled: boolean) => {
    window.localStorage.setItem(this._notificationsEnabledKey, `${isEnabled}`)
  }

  public tryAskPermission = () => {
    if (this.readIsEnabled() && !this.grantedByUser && this.supportedByBrowser()) {
      // eslint-disable-next-line no-console
      this.askPermission().catch((error) => console.error(error))
    }
  }
}

export const NotificationContext = React.createContext<NotificationManager | undefined>(undefined)

export const NotificationProvider: React.FC = ({ children }) => {
  const serviceWorkerManager = useServiceWorkerManager()
  const notificationManager = new NotificationManager(serviceWorkerManager)
  return <NotificationContext.Provider value={notificationManager}>{children}</NotificationContext.Provider>
}

export const useNotificationManager = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error(`NotificationManager cannot be used outside the Notification context`)
  }
  return context
}
