import React from 'react'

export class SoundManager {
  private _soundsEnabledKey = 'soundsEnabled'

  private audio: HTMLAudioElement

  private audioPromise: Promise<void> | null

  private initialized = false

  constructor() {
    this.audio = new Audio()
    this.audioPromise = null

    if (!window.localStorage.getItem(this._soundsEnabledKey)) {
      window.localStorage.setItem(this._soundsEnabledKey, 'true')
    }
  }

  readIsEnabled = () => window.localStorage.getItem(this._soundsEnabledKey) === 'true'

  writeIsEnabled = (isEnabled: boolean) => {
    window.localStorage.setItem(this._soundsEnabledKey, `${isEnabled}`)
  }

  // On iOS, sounds have to be enabled through user interaction.
  // Playing an empty audio object on user interaction enables playing further audio.
  public initOnInteraction = () => {
    if (!this.initialized) {
      this.initialized = true
      this.audio.play()
      try {
        this.audio.pause()
      } catch (e) {
        // Error is expected here - as play will not stop that quickly
      }
    }
  }

  public playTimeOver = () => {
    if (this.readIsEnabled()) {
      this.initialized = true
      if (this.audioPromise) {
        this.audio.pause()
      }
      this.audio.src = 'finish-sound.mp3'
      this.audio.volume = 0.3
      this.audio.currentTime = 0
      this.audioPromise = this.audio.play()
      if (this.audioPromise) {
        this.audioPromise
          // eslint-disable-next-line no-console
          .catch((error) => console.error(error))
          .then(() => {
            this.audioPromise = null
          })
      }
    }
  }
}

export const SoundContext = React.createContext<SoundManager | undefined>(undefined)

export const SoundProvider: React.FC = ({ children }) => {
  const soundManager = new SoundManager()
  return <SoundContext.Provider value={soundManager}>{children}</SoundContext.Provider>
}

export const useSoundManager = () => {
  const context = React.useContext(SoundContext)
  if (!context) {
    throw new Error(`SoundManager cannot be used outside the Sound context`)
  }
  return context
}
