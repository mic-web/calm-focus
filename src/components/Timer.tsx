import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Phases, Seconds } from '../types'
import useSecondsLeft from '../selectors/useSecondsLeft'
import useMinutesLeft from '../selectors/useMinutesLeft'
import usePhase from '../selectors/usePhase'
import { isActivePhase } from '../services/timer'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: (props: { isSmall: boolean }) => (props.isSmall && '4rem') || '6rem',
    lineHeight: '1em',
    userSelect: 'none',
    alignSelf: 'center',
    opacity: (props: { phase: Phases }) => (!isActivePhase(props.phase) && 0.5) || 1.0,
    '& small': {
      fontSize: '0.35em',
      lineHeight: '1em',
    },
  },
}))

const secondsToText = (seconds: Seconds): string => (seconds <= 9 ? `0${seconds}` : `${seconds}`)

const Timer: React.FC = () => {
  const secondsLeft = useSecondsLeft()
  const minutesLeft = useMinutesLeft()
  const phase = usePhase()
  const isSmall = useMediaQuery('(max-height:  400px), (max-width: 400px)')

  const css = useStyles({ phase, isSmall })
  const secondsOfMinuteLeft = secondsLeft % 60
  return (
    <div className={css.root}>
      {minutesLeft}
      <small>{secondsToText(secondsOfMinuteLeft)}</small>
    </div>
  )
}

export default Timer
