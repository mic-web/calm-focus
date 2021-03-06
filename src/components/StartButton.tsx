import React from 'react'
import { IconButton, makeStyles, SvgIcon } from '@material-ui/core'
import PlayIcon from '../icons/PlayIcon'

type Props = {
  start: (event?: React.SyntheticEvent) => void
}

const useStyles = makeStyles(({ palette }) => ({
  icon: {
    filter: `drop-shadow(0px 0px 5px ${palette.common.white})`,
  },
}))

const StartButton: React.FC<Props> = (props) => {
  const css = useStyles()
  const { start } = props

  return (
    <IconButton onClick={start} title="Start (Shortcut: Space)" color="inherit" className={css.icon}>
      <SvgIcon>
        <PlayIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default StartButton
