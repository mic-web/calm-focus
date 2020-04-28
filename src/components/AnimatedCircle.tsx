import React from 'react'
import styled, { css } from 'styled-components'

type CircleProps = {
  progress: number
  className?: string
}

const Circle: React.FC<CircleProps> = ({ progress, className }) => {
  const radius = 60
  const stroke = 2

  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progress * circumference
  const diameter = radius * 2
  return (
    <div className={className}>
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

const StyledCircle = styled(Circle)`
  display: flex;
  circle {
    fill: none;
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    ${(props) => css`
      stroke: ${props.theme.colors.white};
    `};
  }
`

export default StyledCircle
