import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { States } from '../types'

type Props = {
  state: States
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
    opacity: (props: Props) => ((props.state === States.REST_READY || props.state === States.WORK_READY) && 0.5) || 1.0,
    '& small': {
      fontSize: '3vh',
      lineHeight: '4vh',
    },
  },
}))

const Timer: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const { secondsLeft } = props
  const minutesLeft = Math.floor(secondsLeft / 60)
  const secondsOfMinuteLeft = secondsLeft % 60
  return (
    <div className={css.root}>
      {minutesLeft}
      <small>{secondsOfMinuteLeft}</small>
    </div>
  )
}

export default Timer
