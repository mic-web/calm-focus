import React from 'react'

import { Box, makeStyles } from '@material-ui/core'
import PictureCredits from './PictureCredits'
import { States } from '../types'
import NotificationsButton from './NotificationsButton'
import InstallButton from './InstallButton'

type Props = {
  state: States
  open: boolean
}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    padding: 30,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    background: 'rgba(0, 20, 30, 0.9)',
    filter: `drop-shadow(0px 0px 5px ${palette.common.black})`,
  },
}))

const Menu: React.FC<Props> = (props) => {
  const css = useStyles(props)
  return (
    <div className={css.root}>
      <NotificationsButton />
      <InstallButton />
      <Box mt="auto">
        <PictureCredits />
      </Box>
    </div>
  )
}

export default Menu
