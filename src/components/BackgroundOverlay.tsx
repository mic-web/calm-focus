import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Phases } from '../types'
import usePhase from '../selectors/usePhase'
import { isActivePhase } from '../services/timer'

const useStyles = makeStyles(({ palette }) => ({
  root: (props: { phase: Phases }) => {
    const visibleStyle = {
      opacity: 0.7,
      transition: 'opacity 2s ease',
    }
    let background = fade(palette.common.black, 0.5)
    if (props.phase === Phases.REST) {
      background = fade(palette.common.white, 0.5)
    }
    return {
      position: 'absolute',
      background,
      opacity: 0,
      transition: 'opacity 2s ease',
      width: '100%',
      height: '100%',
      ...(isActivePhase(props.phase) && visibleStyle),
    }
  },
}))

const Background: React.FC = () => {
  const phase = usePhase()
  const classes = useStyles({ phase })
  return <div className={classes.root} />
}

export default Background
