import React from 'react'

import { Box, fade, makeStyles, SvgIcon, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Phases } from '../types'
import MenuIcon from '../icons/MenuIcon'

type Props = {
  phase: Phases
}

type MenuContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const MenuContext = React.createContext<MenuContextType | undefined>(undefined)

const useMenuContext = () => {
  const context = React.useContext(MenuContext)
  if (!context) {
    throw new Error(`Menu compound components cannot be rendered outside the Menu component`)
  }
  return context
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
  icon: {
    width: '1.3em',
    height: '1.3em',
  },
}))

export const MenuContent: React.FC = (props) => {
  const { children } = props
  const css = useStyles()
  const { open } = useMenuContext()
  return (
    <Box
      display="flex"
      position="absolute"
      alignSelf="center"
      width="95%"
      height="95%"
      visibility={open ? 'visible' : 'hidden'}
    >
      <div className={css.root}>
        <div className={css.scrollContainer}>
          <MenuCloseButton />
          {children}
        </div>
      </div>
    </Box>
  )
}

const MenuCloseButton: React.FC = () => {
  const css = useStyles()
  const { setOpen } = useMenuContext()
  const close = () => setOpen(false)
  return (
    <IconButton className={css.close} onClick={close} title="Close" color="inherit">
      <SvgIcon>
        <CloseIcon />
      </SvgIcon>
    </IconButton>
  )
}

export const MenuOpenButton: React.FC = () => {
  const { open, setOpen } = useMenuContext()
  const css = useStyles()
  if (open) {
    return null
  }
  return (
    <Box display="flex" position="absolute" bottom={2} right={2}>
      <IconButton onClick={() => setOpen(true)} title="Menu">
        <SvgIcon className={css.icon}>
          <MenuIcon />
        </SvgIcon>
      </IconButton>
    </Box>
  )
}

const Container: React.FC = (props) => {
  const { children } = props
  const [open, setOpen] = React.useState(false)
  const value = React.useMemo(() => ({ open, setOpen }), [open])
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export default Container
