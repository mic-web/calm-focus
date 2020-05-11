import React from 'react'

import IconButton from './IconButton'
import ResetIcon from '../icons/ResetIcon'

type ResetButtonProps = {
  className?: string
  reset: (event: React.SyntheticEvent) => void
}

const ResetButton: React.FC<ResetButtonProps> = ({ className, reset }) => {
  return (
    <IconButton onClick={reset} className={className} subtle title="Reset time">
      <ResetIcon />
    </IconButton>
  )
}

export default ResetButton
