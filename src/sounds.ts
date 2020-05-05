import React from 'react'

const audio = new Audio()
let initialized = false

// On iOS, sounds have to be enabled through user interaction.
// Playing an empty audio object on user interaction enables playing further audio.
const initOnInteraction = (event: React.MouseEvent) => {
  if (!initialized) {
    initialized = true
    audio.play()
  }
  return event
}

const playTimeOver = () => {
  audio.pause()
  audio.currentTime = 0
  audio.src = 'finish-sound.mp3'
  audio.volume = 0.3
  audio.play().catch((error) => console.error(error))
}

const sounds = {
  initOnInteraction,
  playTimeOver,
}

export default sounds
