import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Phases } from '../types'
import usePhase from '../hooks/usePhase'

type Props = {
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
    alignItems: 'center',
    flexGrow: 1,
    maxWidth: '300px',
  },
  done: {
    transition: 'opacity 2s ease',
    opacity: 0.8,
  },
}))

const TickShine: React.FC<Props> = (props) => {
  const phase = usePhase()
  const css = useStyles(props)
  const { children } = props
  const getClasses = () => {
    if (phase === Phases.REST || phase === Phases.WORK) {
      return clsx(css.root, css.tick)
    }
    return clsx(css.root, css.done)
  }

  return <div className={getClasses()}>{children}</div>
}

export default TickShine
