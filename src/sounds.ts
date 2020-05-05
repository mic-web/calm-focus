const confirmation = new Audio('finish-sound.mp3')
confirmation.volume = 0.3

type Sounds = {
  playTimeOver: () => void
}

const sounds: Sounds = {
  playTimeOver: () => {
    confirmation.pause()
    confirmation.currentTime = 0
    confirmation.play()
  },
}

export default sounds
