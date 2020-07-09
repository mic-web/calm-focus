import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'
import { Phases } from '../types'
import usePhase from '../hooks/usePhase'

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexGrow: 1,
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    background: fade(palette.primary.dark, 0.25),
  },
}))

const Hint: React.FC = () => {
  const phase = usePhase()
  const css = useStyles({ phase })
  const hintText = {
    [Phases.WORK_READY]: 'Get ready to focus',
    [Phases.WORK]: 'Stay focused',
    [Phases.REST_READY]: 'Take a short rest',
    [Phases.REST]: 'Time for a rest',
  }[phase]
  return (
    <div className={css.root}>
      <Typography variant="subtitle1">{hintText}</Typography>
    </div>
  )
}

export default Hint
