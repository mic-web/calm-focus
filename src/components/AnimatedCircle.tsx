import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SvgIcon } from '@material-ui/core'
import { Phases } from '../types'
import usePhase from '../hooks/usePhase'
import useProgress from '../hooks/useProgress'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    width: '100%',
    height: '100%',
    '& circle': {
      fill: 'none',
      transition: 'stroke-dashoffset 0.35s',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
      stroke: palette.common.white,
      opacity: (props: { phase: Phases }) =>
        ((props.phase === Phases.REST_READY || props.phase === Phases.WORK_READY) && 0.5) || 1.0,
    },
  },
}))

const Circle: React.FC = () => {
  const phase = usePhase()
  const progress = useProgress()

  const css = useStyles({ phase })

  const radius = 60
  const stroke = 2

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress * circumference
  const diameter = radius * 2
  return (
    <SvgIcon className={css.root} viewBox={`0 0 ${diameter} ${diameter}`}>
      <circle
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </SvgIcon>
  )
}

export default Circle
