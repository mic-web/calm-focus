self.timerStart = true

function updateTime(startDate) {
  const now = new Date().valueOf()
  const diff = now - startDate
  const passedSeconds = Math.floor(diff / 1000)

  postMessage(passedSeconds)
}

if (self.timerStart) {
  // get current time
  const startDate = new Date().valueOf()
  // repeat myTimer(d0) every 100 ms
  self.myVar = setInterval(() => {
    updateTime(startDate)
  }, 100)
  // timer should not start anymore since it has been started
  self.timerStart = false
}
