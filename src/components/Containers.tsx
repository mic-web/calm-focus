import styled, { keyframes, css } from 'styled-components'
import { States } from '../types'

export const Time = styled.div<{ state: States }>`
  display: flex;
  flex: 1;
  ${(props) => {
    switch (props.state) {
      case States.WORK:
        return css`
          animation: 1s 'tick-shine' infinite;
        `
      case States.WORK_READY:
        return css`
          opacity: 1;
        `
      default:
        return css`
          transition: opacity 2s ease;
          opacity: 0.8;
        `
    }
  }}
`
