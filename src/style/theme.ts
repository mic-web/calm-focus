import { responsiveFontSizes } from '@material-ui/core'
import { createMuiTheme, ThemeOptions, darken } from '@material-ui/core/styles'

import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import { blueGrey } from '@material-ui/core/colors'
import eot from '../fonts/fira-sans-v10-latin-regular.eot'
import woff from '../fonts/fira-sans-v10-latin-regular.woff'
import woff2 from '../fonts/fira-sans-v10-latin-regular.woff2'
import svg from '../fonts/fira-sans-v10-latin-regular.svg'
import ttf from '../fonts/fira-sans-v10-latin-regular.ttf'

const fontName = 'Fira Sans'

const josefin = {
  fontFamily: fontName,
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    url('${eot}?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('${woff2}') format('wof=f2'), /* Super Modern Browsers */
    url('${woff}') format('woff'), /* Pretty Modern Browsers */
    url('${svg}#${fontName}') format('svg'); /* Legacy iOS */
    url('${ttf}')  format('truetype'), /* Safari, Android, iOS *//
  `,
}

const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      root: {},
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [josefin],
      },
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
    fontSize: 16,
    fontFamily: `'${fontName}', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'`,
    subtitle1: {
      fontSize: '1.4rem',
    },
  },
  spacing: 4,
}

const theme = createMuiTheme(defaultTheme)
const responsiveTheme = responsiveFontSizes(theme)

export default responsiveTheme