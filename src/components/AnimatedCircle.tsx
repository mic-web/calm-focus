import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SvgIcon } from '@material-ui/core'
import { Phases } from '../types'
import usePhase from '../selectors/usePhase'
import useProgress from '../selectors/useProgress'
import { isActivePhase } from '../services/timer'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    flex: 1,
    height: '100%',
    width: '100%',
    transform: 'rotate(-90deg)', // translate for Safari to stay in center when zooming
    '& circle': {
      fill: 'none',
      transition: 'stroke-dashoffset 0.35s',
      stroke: palette.common.white,
      opacity: (props: { phase: Phases }) => (!isActivePhase(props.phase) && 0.5) || 1.0,
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
        strokeLinecap="round"
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
