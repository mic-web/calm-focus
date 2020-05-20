const soundsEnabledKey = 'soundsEnabled'
if (!window.localStorage.getItem(soundsEnabledKey)) {
  window.localStorage.setItem(soundsEnabledKey, 'true')
}

export const readIsEnabled = () => window.localStorage.getItem(soundsEnabledKey) === 'true'

export const writeIsEnabled = (isEnabled: boolean) => {
  window.localStorage.setItem(soundsEnabledKey, `${isEnabled}`)
}

const audio = new Audio()

let initialized = false

// On iOS, sounds have to be enabled through user interaction.
// Playing an empty audio object on user interaction enables playing further audio.
export const initOnInteraction = () => {
  if (!initialized) {
    initialized = true
    audio.play()
  }
}

export const playTimeOver = () => {
  if (readIsEnabled()) {
    initOnInteraction()
    audio.pause()
    audio.currentTime = 0
    audio.src = 'finish-sound.mp3'
    audio.volume = 0.3
    audio.play().catch((error) => console.error(error))
  }
}
