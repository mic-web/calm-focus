import React from 'react'
import styled from 'styled-components'
import { States } from '../types'

type TimerProps = {
  className?: string
  state: States
  secondsLeft: number
}

const Timer: React.FC<TimerProps> = ({ state, secondsLeft, className }) => {
  const minutesLeft = Math.floor(secondsLeft / 60)
  const secondsOfMinuteLeft = secondsLeft % 60
  return (
    <div className={className}>
      {(state === States.INITIAL && <small>READY</small>) || (state === States.COMPLETED && <small>DONE</small>) || (
        <>
          {minutesLeft}
          <small>{secondsOfMinuteLeft}</small>
        </>
      )}
    </div>
  )
}

const StyledTimer = styled(Timer)`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 2.2em;
  user-select: none;
  align-self: center;
  small {
    font-size: 0.4em;
  }
`

export default StyledTimer
