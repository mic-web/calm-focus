import React from 'react'
import styled, { css } from 'styled-components'

import { States } from '../types'

type HintProps = {
  state: States
  className?: string
}

const Hint: React.FC<HintProps> = ({ state, className }) =>
  state === States.COMPLETED && <div className={className}>Take a pause for 5 minutes</div>

export default styled(Hint)`
  display: flex;
  text-align: center;
  font-size: 0.8em;
  top: 20px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
`
