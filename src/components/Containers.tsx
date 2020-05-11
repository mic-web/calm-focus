import styled, { keyframes, css } from 'styled-components'
import { States } from '../types'

export const App = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  position: relative;
  ${(props) => css`
    color: ${props.theme.colors.white};
  `}
`
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`
export const tickShine = keyframes`
  0% {
    opacity: 0.8;
  }
  10% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`
export const Time = styled.div<{ state: States }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: stretch;
  margin-top: auto;
  height: 40vh;
  ${(props) => {
    switch (props.state) {
      case States.WORK:
        return css`
          animation: 1s ${tickShine} infinite;
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
export const Hint = styled.div`
  display: flex;
  position: absolute;
  align-self: center;
  bottom: 0;
`
export const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: stretch;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: auto;
`
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
`
export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  right: 30px;
`
