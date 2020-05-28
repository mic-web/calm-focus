import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Phases, Seconds } from '../types'
import { useSecondsLeft, useMinutesLeft } from './timer'

type Props = {
  phase: Phases
  secondsLeft: number
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '8vh',
    lineHeight: '1.1em',
    userSelect: 'none',
    alignSelf: 'center',
    opacity: (props: Props) => ((props.phase === Phases.REST_READY || props.phase === Phases.WORK_READY) && 0.5) || 1.0,
    '& small': {
      fontSize: '3vh',
      lineHeight: '4vh',
    },
  },
}))

const secondsToText = (seconds: Seconds): string => (seconds <= 9 ? `0${seconds}` : `${seconds}`)

const Timer: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const secondsLeft = useSecondsLeft()
  const minutesLeft = useMinutesLeft()
  const secondsOfMinuteLeft = secondsLeft % 60
  return (
    <div className={css.root}>
      {minutesLeft}
      <small>{secondsToText(secondsOfMinuteLeft)}</small>
    </div>
  )
}

export default Timer
