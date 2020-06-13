// // import original module declarations
// import 'styled-components'
import { Theme as MuiTheme } from '@material-ui/core/styles'

// // Extend original module
// declare module 'styled-components' {
//   // export type DefaultTheme = MuiTheme
//   export interface DefaultTheme {
//     //   colors: {
//     //     primary: string
//     //     dark: string
//     //     white: string
//     //     darkBlue: string
//     //     darkBlueBackground: string
//     //   }
//     //   spacing: number
//     // }
//   }
// }

// import original module declarations
import 'styled-components'

// Extend original module
declare module 'styled-components' {
  // export interface DefaultTheme extends MuiTheme {
  //   // colors: {
  //   // primary: string
  //   // dark: string
  //   // white: string
  //   // darkBlue: string
  //   // darkBlueBackground: string
  //   // }
  //   // spacing: number
  // }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MuiTheme {}
}
