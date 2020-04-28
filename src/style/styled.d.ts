// import original module declarations
import 'styled-components'

// Extend original module
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      dark: string
      white: string
      darkBlue: string
      darkGradient: string
      lightGradient: string
    }
    spacing: number
  }
}
