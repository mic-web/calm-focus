import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Phases } from '../types'

type Props = {
  phase: Phases
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  tick: {
    animation: '1s tick-shine infinite',
  },
  root: {
    opacity: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  done: {
    transition: 'opacity 2s ease',
    opacity: 0.8,
  },
}))

const TickShine: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const { children, phase } = props
  const getClasses = () => {
    if (phase === Phases.REST || phase === Phases.WORK) {
      return clsx(css.root, css.tick)
    }
    return clsx(css.root, css.done)
  }

  return <div className={getClasses()}>{children}</div>
}

export default TickShine
