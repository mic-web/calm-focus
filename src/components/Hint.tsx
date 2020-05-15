import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { States } from '../types'

type Props = {
  state: States
  restMinutes: number
}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    textAlign: 'center',
    fontSize: '0.8em',
    top: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: '10px 20px',
    color: palette.common.white,
    background: palette.common.black,
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
