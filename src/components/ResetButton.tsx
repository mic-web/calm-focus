import React from 'react'
import styled from 'styled-components'

import { States } from '../types'
import IconButton from './IconButton'
import ResetIcon from '../icons/ResetIcon'

type ResetButtonProps = {
  state: States
  className?: string
  reset: () => void
}

const ResetButton: React.FC<ResetButtonProps> = ({ state, className, reset }) => {
  return (
    <IconButton
      onClick={reset}
      className={className}
      subtle={state === States.RUNNING}
      invisible={state === States.INITIAL}
      title="Reset time"
    >
      <ResetIcon />
    </IconButton>
  )
}

export default ResetButton
