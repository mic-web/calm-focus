import React from 'react'

import { States } from '../types'
import IconButton from './IconButton'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'

type StartButtonProps = {
  state: States
  start: () => void
  pause: () => void
  resume: () => void
  className?: string
}

const StartButton: React.FC<StartButtonProps> = ({ state, start, pause, resume, className }) => {
  switch (state) {
    case States.INITIAL:
    case States.COMPLETED:
      return (
        <IconButton
          onClick={start}
          css={`
            /* Align to visual center (centroid) of the triangle */
          `}
          subtle={state === States.COMPLETED}
        >
          <PlayIcon />
        </IconButton>
      )
    case States.RUNNING:
      return (
        <IconButton onClick={pause}>
          <PauseIcon />
        </IconButton>
      )
    case States.PAUSED:
      return (
        <IconButton onClick={resume}>
          <PlayIcon />
        </IconButton>
      )
    default:
      return null
  }
}

export default StartButton
