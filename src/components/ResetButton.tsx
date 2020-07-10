import React from 'react'

import { IconButton, SvgIcon, makeStyles } from '@material-ui/core'
import ResetIcon from '../icons/ResetIcon'

type ResetButtonProps = {
  reset: (event: React.SyntheticEvent) => void
}

const useStyles = makeStyles(() => ({
  icon: {
    width: '1.3em',
    height: '1.3em',
  },
}))

const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => {
  const css = useStyles()
  return (
    <IconButton onClick={reset} title="Reset">
      <SvgIcon className={css.icon}>
        <ResetIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default ResetButton
