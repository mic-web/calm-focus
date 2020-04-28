import styled, { css } from 'styled-components'

import React from 'react'
import { States } from '../types'

type Props = {
  state: States
  className?: string
}

const Background: React.FC<Props> = ({ className }) => <div className={className} />

export default styled(Background)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${(props) =>
    props.state === States.COMPLETED &&
    css`
      opacity: 1;
      transition: opacity 2s ease;
    `}
  ${(props) => css`
    background: ${props.theme.colors.primary};
    background: ${props.theme.colors.lightGradient};
  `};
`
