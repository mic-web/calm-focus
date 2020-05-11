import React from 'react'
import styled from 'styled-components'

import IconButton from './IconButton'
import PlayIcon from '../icons/PlayIcon'

type StartButtonProps = {
  start: (event?: React.MouseEvent) => void
  className?: string
}

const StartButton: React.FC<StartButtonProps> = ({ start }) => {
  return (
    <IconButton onClick={start} title="Start focus for 25 minutes">
      <HighlightedPlayIcon />
    </IconButton>
  )
}

const HighlightedPlayIcon = styled(PlayIcon)`
  filter: drop-shadow(0px 0px 5px white);
`

export default StartButton
