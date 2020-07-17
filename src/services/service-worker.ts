/* eslint-disable no-console */

let registeredSW: ServiceWorkerRegistration
let deferredPrompt: BeforeInstallPromptEvent | null
const prevInstallKey = 'previousInstall'
const prevInstallDismissed = 'dismissed'

export const isSwSupported = () => 'serviceWorker' in navigator

if (isSwSupported()) {
  window.addEventListener('load', () => {
    // eslint-disable-next-line compat/compat
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration: ServiceWorkerRegistration) => {
        registeredSW = registration
        console.log('Service Worker registered: ', registeredSW)
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed: ', registrationError, registrationError.message)
      })
  })
} else {
  console.warn('Service Workers not supported')
}

export const askForInstallation = () => {
  if (deferredPrompt) {
    return deferredPrompt
      .prompt()
      .then((result) => console.log('Install prompt result', result))
      .then(() => {
        // Wait for the user to respond to the prompt
        if (deferredPrompt) {
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'dismissed') {
              console.log('User dismissed the install prompt')
              localStorage.setItem(prevInstallKey, prevInstallDismissed)
            }
            deferredPrompt = null
          })
        }
      })
      .catch((error) => console.error(error))
  }
  return Promise.reject(new Error('Asking for installation not (yet) possible - no prompt yet'))
}

let beforeInstallPromptReceived = false

type callbackType = () => void
let installPossibleSubscriber: null | callbackType = null

export const installAlreadyPossible = () => !!beforeInstallPromptReceived
export const onInstallPossible = (sub: () => void) => {
  installPossibleSubscriber = sub
}
const onBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
  if (!beforeInstallPromptReceived) {
    beforeInstallPromptReceived = true
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = event
  }
  if (installPossibleSubscriber) {
    installPossibleSubscriber()
  }
}

if (localStorage.getItem(prevInstallKey) === prevInstallDismissed) {
  console.log("Installation has been denied earlier, don't ask again")
} else {
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
}

window.addEventListener('appinstalled', (evt) => {
  console.log('Successfully installed', evt)
})

export const showNotification = (title: string, options?: NotificationOptions) => {
  if (registeredSW && registeredSW.showNotification) {
    registeredSW.showNotification(title, options)
  }
}

export const isReady = () => !!registeredSW
