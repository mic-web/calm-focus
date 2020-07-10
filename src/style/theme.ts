import { responsiveFontSizes } from '@material-ui/core'
import { createMuiTheme, ThemeOptions, darken } from '@material-ui/core/styles'

import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import { blueGrey } from '@material-ui/core/colors'

const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      root: {},
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: teal[300],
      dark: darken(blueGrey[800], 0.7),
    },
    secondary: cyan,
  },
  typography: {
    fontSize: 14,
    subtitle1: {
      fontSize: '1.4rem',
    },
  },
  spacing: 4,
}

const theme = createMuiTheme(defaultTheme)
const responsiveTheme = responsiveFontSizes(theme)

export default responsiveTheme
