import styled, { css } from 'styled-components'

import React from 'react'

type Props = {
  disabled?: boolean
  subtle?: boolean
  invisible?: boolean
  highlight?: boolean
  title?: string
  onClick: (e?: React.MouseEvent) => void
  className?: string
  css?: string
}

const IconButton: React.FC<Props> = ({ onClick, className, children, title }) => (
  <button className={className} onClick={onClick} type="button" onKeyUp={() => onClick()} tabIndex={0} title={title}>
    {children}
  </button>
)

const StyledIconButton = styled(IconButton)`
  outline: none;
  fill: #fff;
  display: flex;
  text-align: center;
  height: 35px;
  width: 35px;
  transition: opacity 0.5s ease, transform 0.3s ease;
  border: none;
  background: none;
  ${(props) =>
    (props.invisible && {
      visibility: 'hidden',
    }) ||
    (props.disabled && {
      opacity: 0.3,
      pointerEvents: 'none',
    }) ||
    (props.subtle && {
      opacity: 0.6,
    })}

  ${(props) => css`
    color: ${props.theme.colors.white};
  `}

  &:hover:not(.disabled) {
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
