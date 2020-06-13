import React from 'react'

import { IconButton, SvgIcon } from '@material-ui/core'
import ResetIcon from '../icons/ResetIcon'

type ResetButtonProps = {
  reset: (event: React.SyntheticEvent) => void
}

const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => {
  return (
    <IconButton onClick={reset} title="Reset">
      <SvgIcon>
        <ResetIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default ResetButton
