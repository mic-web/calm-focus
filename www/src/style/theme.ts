import { responsiveFontSizes } from '@material-ui/core'
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'

import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'

const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      root: {},
    },
  },
  palette: {
    type: 'dark',
    primary: cyan,
    secondary: teal,
  },
  typography: {
    fontSize: 12,
  },
  spacing: 4,
}

const theme = createMuiTheme(defaultTheme)
const responsiveTheme = responsiveFontSizes(theme)

export default responsiveTheme
