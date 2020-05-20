import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import { States } from '../types'

type Props = {
  state: States
}

const useStyles = makeStyles(({ palette }) => ({
  root: (props: Props) => {
    const visibleStyle = {
      opacity: 0.5,
      transition: 'opacity 2s ease',
    }
    return {
      position: 'absolute',
      background: fade(palette.common.black, 0.5),
      opacity: 0,
      transition: 'opacity 2s ease',
      width: '100%',
      height: '100%',
      ...(props.state === (States.WORK || States.REST) && visibleStyle),
    }
  },
}))

const Background: React.FC<Props> = (props) => {
  const classes = useStyles(props)
  return <div className={classes.root} />
}

export default Background
