import React from 'react'
import styled from 'styled-components'

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
      return (
        <IconButton onClick={start} highlight={state === States.INITIAL} title="Start 25 minutes session">
          <HighlightedPlayIcon />
        </IconButton>
      )
    case States.COMPLETED:
      return (
        <IconButton onClick={start} subtle title="Start next 25 minutes session">
          <PlayIcon />
        </IconButton>
      )
    default:
      return null
  }
}

const HighlightedPlayIcon = styled(PlayIcon)`
  filter: drop-shadow(0px 0px 5px white);
`

export default StartButton
