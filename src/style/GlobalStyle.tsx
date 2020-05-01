import { createGlobalStyle } from 'styled-components'

import { normalize } from 'styled-normalize'
import lakeImage from '../img/lake-2000.jpg'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    overflow: hidden;
    touch-action: none;
    background: rgb(39, 44, 55);
    background: url(${lakeImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  svg {
    width: 100%;
    height: auto;
  }
  button {
    /* Mainly reset default button styles */
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    outline: none;
    border-style: none;
    /* Remove excess padding and border in Firefox 4+ */
    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
    &:active {
      outline: none;
      border-style: none;
    }
    border-radius: 0;
    background-color: transparent;
  }
`
export default GlobalStyle
