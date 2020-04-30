import React from 'react'

import { States } from '../types'
import IconButton from './IconButton'
import PlayIcon from '../icons/PlayIcon'

type StartButtonProps = {
  state: States
  start: () => void
  className?: string
}

const StartButton: React.FC<StartButtonProps> = ({ state, start }) => {
  switch (state) {
    case States.INITIAL:
    case States.COMPLETED:
      return (
        <IconButton onClick={start} subtle={state === States.COMPLETED} title="Start 25 minutes session">
          <PlayIcon />
        </IconButton>
      )
    default:
      return null
  }
}

export default StartButton
