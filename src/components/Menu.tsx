import React from 'react'

import { Box, fade, makeStyles, SvgIcon, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '../icons/MenuIcon'

type MenuContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

const MenuContext = React.createContext<MenuContextType | undefined>(undefined)

export const useMenuContext = () => {
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 15,
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

export const MenuContent: React.FC = ({ children }) => {
  const css = useStyles()
  const { open } = useMenuContext()
  return (
    <Box
      display="flex"
      position="absolute"
      alignSelf="center"
      width="95%"
      height="95%"
      top="2.5%"
      // Hide but don't remove from DOM to avoid
      // ugly rerendering on every open.
      visibility={open ? 'visible' : 'hidden'}
    >
      <div className={css.root}>
        <div className={css.scrollContainer}>
          <>
            <MenuCloseButton />
            {children}
          </>
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
    <IconButton className={css.close} onClick={close} title="Close (Shortcut: Escape)" color="inherit">
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
    <Box display="flex" position="absolute" bottom="5px" right="0px">
      <IconButton onClick={() => setOpen(true)} title="Menu (Shortcut: m)">
        <SvgIcon className={css.icon}>
          <MenuIcon />
        </SvgIcon>
      </IconButton>
    </Box>
  )
}

export const MenuProvider: React.FC = (props) => {
  const { children } = props
  const [open, setOpen] = React.useState(false)
  const value = React.useMemo(() => ({ open, setOpen }), [open])
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
