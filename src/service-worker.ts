/* eslint-disable no-console */

let registeredSW: ServiceWorkerRegistration
let deferredPrompt: BeforeInstallPromptEvent
const prevInstallKey = 'previousInstall'
const prevInstallDismissed = 'dismissed'

const isSupported = () => 'serviceWorker' in navigator

if (isSupported()) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration: ServiceWorkerRegistration) => {
        console.log('Service Worker registered: ', registeredSW)
        registeredSW = registration
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed: ', registrationError, registrationError.message)
      })
  })
} else {
  console.warn('Service Workers not supported')
}

const askForInstallation = () => {
  deferredPrompt
    .prompt()
    .then((result) => console.log('Install prompt result', result))
    .then(() => {
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'dismissed') {
          console.log('User dismissed the install prompt')
          localStorage.setItem(prevInstallKey, prevInstallDismissed)
        }
        deferredPrompt = null
      })
    })
    .catch((error) => console.error(error))
}

let asked = false
const onInstallPrompt = (event: BeforeInstallPromptEvent) => {
  if (!asked) {
    asked = true
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = event
    // Update UI notify the user they can install the PWA
    askForInstallation()
  }
}

if (localStorage.getItem(prevInstallKey) === prevInstallDismissed) {
  console.log("Installation has been denied earlier, don't ask again")
} else {
  window.addEventListener('beforeinstallprompt', onInstallPrompt)
}

window.addEventListener('appinstalled', (evt) => {
  console.log('Successfully installed', evt)
})

const showNotification = (title: string, options?: NotificationOptions) => {
  registeredSW.showNotification(title, options)
}

const isReady = () => !!registeredSW

export default {
  showNotification,
  isReady,
  isSupported,
}
