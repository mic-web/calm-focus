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
    try {
      audio.pause()
    } catch (e) {
      // Error is expected here - as play will not stop that quickly
    }
  }
}

let audioPromise: Promise<void> | null = null
export const playTimeOver = () => {
  if (readIsEnabled()) {
    initialized = true
    if (audioPromise) {
      audio.pause()
    }
    audio.src = 'finish-sound.mp3'
    audio.volume = 0.3
    audio.currentTime = 0
    audioPromise = audio.play()
    if (audioPromise) {
      audioPromise
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error))
        .then(() => {
          audioPromise = null
        })
    }
  }
}
