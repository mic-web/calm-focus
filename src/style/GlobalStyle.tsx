import { withStyles } from '@material-ui/core'
import lakeImage from '../img/lake-compressed.jpg'

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    body: {
      margin: 0,
      fontFamily: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'`,
      overflow: 'hidden',
      touchAction: 'none',
      background: `url(${lakeImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    },
    '@keyframes tick-shine': {
      '0%': {
        opacity: 0.8,
      },
      '10%': {
        opacity: 0.8,
      },
      '100%': {
        opacity: 1,
      },
    },
  },
})(() => null)

export default GlobalCss
