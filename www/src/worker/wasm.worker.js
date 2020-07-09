// As thread:sleep won't work in the WebAssembly environment,
// we need to use JS functionality for calculating the interval.
// There's web_sys for providing that as a binding to JS, but
// it's simpler to use it in JS directly.

let intervalId = null
let passedSeconds = 0
const resetTimer = (passed) => {
  passedSeconds = passed
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

import('../../../wasm/pkg/calm_focus_wasm')
  .then((results) => {
    const startTimer = () => {
      resetTimer(0)
      intervalId = setInterval(() => {
        try {
          passedSeconds = results.tick(passedSeconds)
          postMessage(passedSeconds)
        } catch (error) {
          console.error(error)
        }

        // When tab gets inactive, minimum background interval for setInterval is >= 1000ms
        // https://stackoverflow.com/questions/15871942/how-do-browsers-pause-change-javascript-when-tab-or-window-is-not-active
      }, 1000)
    }
    self.addEventListener('message', (ev) => {
      console.log('message', ev)
      startTimer(ev.data)
    })
    startTimer()
  })
  .catch((error) => console.error(error))
