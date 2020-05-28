import React from 'react'

import { Box, fade, makeStyles, SvgIcon, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PictureCredits from './PictureCredits'
import { Phases } from '../types'
import NotificationsConfig from '../notification/NotificationsConfig'
import SoundsConfig from '../sound/SoundsConfig'
import InstallButton from '../installation/InstallButton'

type Props = {
  phase: Phases
  opened: boolean
  close: () => void
}

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    background: fade(palette.background.default, 0.75),
    filter: `drop-shadow(0px 0px 5px ${palette.common.black})`,
    borderRadius: 5,
  },
  scrollContainer: {
    padding: spacing(7),
    paddingTop: spacing(10),
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  close: {
    position: 'absolute',
    top: spacing(1),
    right: spacing(4),
  },
}))

const Menu: React.FC<Props> = (props) => {
  const css = useStyles(props)
  const { close } = props
  return (
    <div className={css.root}>
      <div className={css.scrollContainer}>
        <CloseButton close={close} />
        <Box mb={8}>
          <NotificationsConfig />
        </Box>
        <Box mb={8}>
          <SoundsConfig />
        </Box>
        <Box mb={8}>
          <InstallButton />
        </Box>
        <Box mt="auto">
          <PictureCredits />
        </Box>
      </div>
    </div>
  )
}

type CloseButtonProps = {
  close: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({ close }) => {
  const css = useStyles()
  return (
    <IconButton className={css.close} onClick={close} title="Close" color="inherit">
      <SvgIcon>
        <CloseIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default Menu
