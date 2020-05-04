import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const renderRootElement = (Element: React.SFC) => {
  ReactDOM.render(<Element />, document.getElementById('root'))
}

renderRootElement(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    renderRootElement(require('./App').default)
  })
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError, registrationError.message)
      })
  })
} else {
  console.warn('Service workers not supported')
}

let deferredPrompt: any
function askForInstallation() {
  deferredPrompt.prompt()
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult: any) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
      localStorage.setItem('denyedInstallation', 'true')
    }
  })
  deferredPrompt = null
}

let asked = false
function onInstallPrompt(e: any) {
  if (!asked) {
    asked = true
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = e
    // Update UI notify the user they can install the PWA
    window.removeEventListener('beforeinstallprompt', onInstallPrompt)
    askForInstallation()
  }
}

if (!localStorage.getItem('denyedInstallation')) {
  window.addEventListener('beforeinstallprompt', onInstallPrompt)
} else {
  console.log("Installation has been denied earlier, don't ask again")
}

window.addEventListener('appinstalled', (evt) => {
  console.log('Successfully installed', evt)
})
