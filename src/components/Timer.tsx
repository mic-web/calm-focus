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
  switch (state) {
    case States.WORK_READY:
      return (
        <div className={className}>
          <small>READY FOR FOCUS</small>
        </div>
      )
    case States.REST_READY:
      return (
        <div className={className}>
          <small>TAKE A BREAK</small>
        </div>
      )
    case States.WORK:
      return (
        <div className={className}>
          <small>FOCUS</small>
          {minutesLeft}
          <small>{secondsOfMinuteLeft}</small>
        </div>
      )
    case States.REST:
      return (
        <div className={className}>
          <small>BREAK TIME</small>
          {minutesLeft}
          <small>{secondsOfMinuteLeft}</small>
        </div>
      )
    default:
      return (
        <div className={className}>
          {minutesLeft}
          <small>{secondsOfMinuteLeft}</small>
        </div>
      )
  }
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
