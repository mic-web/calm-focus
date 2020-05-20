import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'

import { States } from '../types'

type Props = {
  state: States
  restMinutes: number
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexGrow: 1,
    fontSize: '1.1rem',
    padding: spacing(1),
    color: palette.grey[600],
    fontWeight: 300,
    background: fade(palette.common.white, 0.4),
    filter: `drop-shadow(0px 0px 5px ${palette.common.white})`,
  },
}))

const Hint: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const { state } = props
  const hintText = {
    [States.WORK_READY]: 'Get ready to focus',
    [States.WORK]: 'Stay focused',
    [States.REST_READY]: 'Take a short rest',
    [States.REST]: 'Time for a rest',
  }[state]
  return <div className={css.root}>{hintText}</div>
}

export default Hint
