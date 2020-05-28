import React from 'react'

import { IconButton, SvgIcon } from '@material-ui/core'
import MenuIcon from '../icons/MenuIcon'
import { Phases } from '../types'

type Props = {
  className?: string
  phase: Phases
  toggleMenu: (event: React.SyntheticEvent) => void
}

const MenuButton: React.FC<Props> = ({ toggleMenu }) => {
  return (
    <IconButton onClick={toggleMenu} title="Menu">
      <SvgIcon>
        <MenuIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default MenuButton
