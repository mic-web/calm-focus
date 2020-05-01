import React from 'react'
import styled, { css } from 'styled-components'

import { States } from '../types'

type HintProps = {
  state: States
  breakMinutes: number
  className?: string
}

const Hint: React.FC<HintProps> = ({ state, breakMinutes, className }) =>
  state === States.COMPLETED && (
    // eslint-disable-next-line react/jsx-one-expression-per-line
    <div className={className}>Take a break for {breakMinutes} minutes</div>
  )

export default styled(Hint)`
  display: flex;
  text-align: center;
  font-size: 0.8em;
  top: 20px;
  background: rgba(39, 44, 46, 0.9);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px 20px;
  ${(props) => css`
    color: ${props.theme.colors.white};
    background: ${props.theme.colors.darkBlue};
  `}
`
