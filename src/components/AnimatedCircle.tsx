import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { States } from '../types'

type Props = {
  progress: number
  state: States
}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
  },
  circle: {
    fill: 'none',
    transition: 'stroke-dashoffset 0.35s',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
    stroke: palette.common.white,
    opacity: (props: Props) => ((props.state === States.REST_READY || props.state === States.WORK_READY) && 0.5) || 1.0,
  },
}))

const Circle: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const { progress } = props
  const radius = 60
  const stroke = 2

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress * circumference
  const diameter = radius * 2
  return (
    <div className={css.root}>
      <svg viewBox={`0 0 ${diameter} ${diameter}`}>
        <circle
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  )
}

export default Circle
