import styled, { css } from 'styled-components'

import React from 'react'

type Props = {
  disabledLook?: boolean
  subtle?: boolean
  invisible?: boolean
  highlight?: boolean
  small?: boolean
  title?: string
  onClick: (event?: React.MouseEvent) => void
  className?: string
  css?: string
}

const IconButton: React.FC<Props> = ({ onClick, className, children, title }) => {
  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      onClick()
    }
  }
  return (
    <button className={className} onClick={onClick} type="button" onKeyUp={onKeyUp} tabIndex={0} title={title}>
      {children}
    </button>
  )
}

const StyledIconButton = styled(IconButton)`
  outline: none;
  fill: #fff;
  stroke: #fff;
  display: flex;
  text-align: center;
  transition: opacity 0.5s ease, transform 0.3s ease;
  border: none;
  background: none;
  ${(props) =>
    (props.invisible && {
      visibility: 'hidden',
    }) ||
    (props.disabledLook && {
      fill: '#ccc',
      stroke: '#ccc',
    }) ||
    (props.subtle && {
      opacity: 0.6,
    })}

  ${(props) => css`
    color: ${props.theme.colors.white};
  `}

  ${(props) => {
    if (props.small) {
      return css`
        width: 25px;
        height: 25px;
      `
    }
    return css`
      width: 35px;
      height: 35px;
    `
  }}

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.1);
    transition: transform 0s ease;
  }
  svg {
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
  }
`

export default StyledIconButton
