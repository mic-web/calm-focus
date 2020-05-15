import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { States } from '../types'

type Props = {
  state: States
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  tick: {
    animation: '1s tick-shine infinite',
  },
  root: {
    opacity: 1,
    display: 'flex',
    flex: 1,
  },
  done: {
    transition: 'opacity 2s ease',
    opacity: 0.8,
  },
}))

const TickShine: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const { children, state } = props
  const classes = [css.root]
  if (state === States.REST || States.WORK) {
    classes.push(css.tick)
  } else {
    classes.push(css.done)
  }

  return <div className={clsx(classes)}>{children}</div>
}

export default TickShine
