import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'

import { Phases } from '../types'

type Props = {
  phase: Phases
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
  const { phase } = props
  const hintText = {
    [Phases.WORK_READY]: 'Get ready to focus',
    [Phases.WORK]: 'Stay focused',
    [Phases.REST_READY]: 'Take a short rest',
    [Phases.REST]: 'Time for a rest',
  }[phase]
  return <div className={css.root}>{hintText}</div>
}

export default Hint
