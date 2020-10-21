import React from 'react'

/* eslint-disable no-console */
export default class ServiceWorkerManager {
  private _registeredSW: ServiceWorkerRegistration

  private _deferredPrompt: BeforeInstallPromptEvent | null

  private _prevInstallKey = 'previousInstall'

  private _prevInstallDismissed = 'dismissed'

  private _installPossible = false

  private _installPossibleSubscriber: null | (() => void) = null

  constructor() {
    if (this.isSwSupported()) {
      window.addEventListener('load', () => {
        // eslint-disable-next-line compat/compat
        navigator.serviceWorker
          .register('service-worker.js')
          .then((registration: ServiceWorkerRegistration) => {
            this._registeredSW = registration
            console.log('Service Worker registered: ', this._registeredSW)
          })
          .catch((registrationError) => {
            console.log('Service Worker registration failed: ', registrationError, registrationError.message)
          })
      })
    } else {
      console.log('Service Workers not supported')
    }

    if (window.localStorage.getItem(this._prevInstallKey) === this._prevInstallDismissed) {
      console.log("Installation has been denied earlier, don't ask again")
    } else {
      window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt)
    }

    window.addEventListener('appinstalled', (evt) => {
      console.log('Successfully installed', evt)
    })
  }

  public isSwSupported = () => 'serviceWorker' in navigator

  public askForInstallation = () => {
    if (this._deferredPrompt) {
      return this._deferredPrompt
        .prompt()
        .then((result) => console.log('Install prompt result', result))
        .then(() => {
          // Wait for the user to respond to the prompt
          if (this._deferredPrompt) {
            this._deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'dismissed') {
                console.log('User dismissed the install prompt')
                localStorage.setItem(this._prevInstallKey, this._prevInstallDismissed)
              }
              this._deferredPrompt = null
            })
          }
        })
        .catch((error) => console.error(error))
    }
    return Promise.reject(new Error('Asking for installation not (yet) possible - no prompt yet'))
  }

  public onBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    if (!this._installPossible) {
      this._installPossible = true
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault()
      // Stash the event so it can be triggered later.
      this._deferredPrompt = event
    }
    if (this._installPossibleSubscriber) {
      this._installPossibleSubscriber()
    }
  }

  public showNotification = (title: string, options?: NotificationOptions) => {
    if (this._registeredSW && this._registeredSW.showNotification) {
      this._registeredSW.showNotification(title, options)
    }
  }

  public subscribeInstallAvailable = (sub: () => void) => {
    this._installPossibleSubscriber = sub
  }

  get installPossible(): boolean {
    return !!this._installPossible
  }

  get isReady(): boolean {
    return !!this._registeredSW
  }
}

export const ServiceWorkerContext = React.createContext<ServiceWorkerManager | undefined>(undefined)

export const ServiceWorkerProvider: React.FC = ({ children }) => {
  const serviceWorkerManager = new ServiceWorkerManager()
  return <ServiceWorkerContext.Provider value={serviceWorkerManager}>{children}</ServiceWorkerContext.Provider>
}

export const useServiceWorkerManager = () => {
  const context = React.useContext(ServiceWorkerContext)
  if (!context) {
    throw new Error(`ServiceWorkerManager cannot be used outside the Notification context`)
  }
  return context
}
