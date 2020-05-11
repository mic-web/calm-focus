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
  opacity: 0.1;
  ${(props) => {
    switch (props.state) {
      case States.WORK_READY:
      case States.REST_READY:
        return css`
          opacity: 0;
          transition: opacity 2s ease;
        `
      default:
        return css`
          opacity: 0.5;
          transition: opacity 2s ease;
        `
    }
  }};
  ${(props) => css`
    background: ${props.theme.colors.darkBlue};
  `};
`
