import { withStyles } from '@material-ui/core'
import lakeImage from '../img/lake-compressed.jpg'

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
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
    '*::-webkit-scrollbar': {
      width: '5px',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.0)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.5)',
      outline: '1px solid slategrey',
    },
    scrollbarColor: '#0A4C95 #C2D2E4',
    'input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      display: 'inline-block',
      cursor: 'default',
      flex: '0 0 auto',
      alignSelf: 'stretch',
      WebkitUserSelect: 'none',
      opacity: '0',
      pointerEvents: 'none',
      WebkitUserModify: 'read-only',
    },
  },
})(() => null)

export default GlobalCss
