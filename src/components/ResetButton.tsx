import React from 'react'

import { IconButton, makeStyles, SvgIcon } from '@material-ui/core'
import ResetIcon from '../icons/ResetIcon'

type ResetButtonProps = {
  reset: (event: React.SyntheticEvent) => void
}

const useStyles = makeStyles(() => ({
  icon: {},
}))

const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => {
  const css = useStyles()
  return (
    <IconButton onClick={reset} title="Reset (Shortcut: Space)" className={css.icon}>
      <SvgIcon>
        <ResetIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default ResetButton
