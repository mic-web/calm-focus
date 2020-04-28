import { createGlobalStyle } from 'styled-components'

import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    &:active {
      outline: none;
      border-style: none;
    }
    border-radius: 0;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;

    /* Remove excess padding and border in Firefox 4+ */
    &::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
  }
`
export default GlobalStyle
