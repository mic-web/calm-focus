import { responsiveFontSizes } from '@material-ui/core'
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'

const defaultTheme: ThemeOptions = {
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 'bold',
        backgroundColor: 'red',
        margin: '10px',
        '&:hover': {
          backgroundColor: 'green',
        },
      },
    },
  },
  palette: {
    type: 'dark',
    // primary: {
    //   //     primary: '#1dca96',
    //   //     dark: '#162338',
    //   //     white: 'rgba(255, 255, 255, 1)',
    //   //     darkBlue: 'rgb(39, 44, 55)',
    //   //     darkBlueBackground: 'rgba(39, 44, 55, 0.3)',
    //   // light: will be calculated from palette.primary.main,
    //   // main: '#ff4400',
    //   // dark: will be calculated from palette.primary.main,
    //   // contrastText: will be calculated to contrast with palette.primary.main
    // },
    // secondary: {
    //   // light: '#0066ff',
    //   // main: '#0044ff',
    //   // // dark: will be calculated from palette.secondary.main,
    //   // contrastText: '#ffcc00',
    // },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    // contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
  },
  spacing: 20,
}

const theme = createMuiTheme(defaultTheme)
const responsiveTheme = responsiveFontSizes(theme)

export default responsiveTheme
