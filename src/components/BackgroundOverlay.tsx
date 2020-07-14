import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Phases } from '../types'
import usePhase from '../selectors/usePhase'

const useStyles = makeStyles(({ palette }) => ({
  root: (props: { phase: Phases }) => {
    const visibleStyle = {
      opacity: 0.7,
      transition: 'opacity 2s ease',
    }
    return {
      position: 'absolute',
      background: fade(palette.common.black, 0.5),
      opacity: 0,
      transition: 'opacity 2s ease',
      width: '100%',
      height: '100%',
      ...(props.phase === (Phases.WORK || Phases.REST) && visibleStyle),
    }
  },
}))

const Background: React.FC = () => {
  const phase = usePhase()
  const classes = useStyles({ phase })
  return <div className={classes.root} />
}

export default Background
