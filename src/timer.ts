export const milliSecondsPerSecond = 1000
const sessionMinutes = 0.05
export const sessionSeconds = sessionMinutes * 60 - 1
export const breakMinutes = 5

const startDateKey = 'startDate'
export const saveStartDate = () => window.localStorage.setItem(startDateKey, new Date().toString())
export const deleteStartDate = () => window.localStorage.removeItem(startDateKey)

const getSavedSeconds = (): number | null => {
  const savedStartDate = window.localStorage.getItem(startDateKey)
  if (!savedStartDate) {
    return null
  }
  const passedSeconds = (new Date().getTime() - new Date(savedStartDate).getTime()) / 1000
  const remainingSeconds = Math.round(sessionSeconds - passedSeconds)
  if (remainingSeconds < 0) {
    deleteStartDate()
    return null
  }
  return remainingSeconds
}

type TimerStatus = {
  secondsLeft: number
  isActive: boolean
  isInitial: boolean
}

export const getInitialState = (): TimerStatus => {
  const initialSeconds = getSavedSeconds()
  let secondsLeft
  if (initialSeconds == null) {
    secondsLeft = sessionSeconds
  } else {
    secondsLeft = initialSeconds
  }
  return {
    secondsLeft,
    isActive: initialSeconds !== null,
    isInitial: initialSeconds === null,
  }
}

export const getPercentage = (secondsLeft: number) => (sessionSeconds - secondsLeft) / sessionSeconds
