import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Phases } from '../types'

type Props = {
  phase: Phases
}

const useStyles = makeStyles(({ palette }) => ({
  root: (props: Props) => {
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

const Background: React.FC<Props> = (props) => {
  const classes = useStyles(props)
  return <div className={classes.root} />
}

export default Background
