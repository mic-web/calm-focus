import React from 'react'

import { Button, SvgIcon, Box, Typography, Link } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import * as serviceWorker from '../service-worker'

type InstallButtonProps = {
  className?: string
}

const PWALink: React.FC = () => (
  <Link
    color="inherit"
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={-1}
    href="https://en.wikipedia.org/wiki/Progressive_web_application"
    underline="always"
  >
    here.
  </Link>
)

const InstallButton: React.FC<InstallButtonProps> = () => {
  const [isInstallable, setIsInstallable] = React.useState(serviceWorker.installAlreadyPossible())
  React.useEffect(() => {
    serviceWorker.onInstallPossible(() => setIsInstallable(true))
  }, [])
  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <SvgIcon>
          <GetAppIcon />
        </SvgIcon>
        <Box ml={2}>
          <Typography variant="h5">Installation</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {isInstallable ? (
          <>
            <Typography variant="body1">
              Install this timer on your device as a PWA. You can find an explanation&nbsp;
              <PWALink />
            </Typography>
            &nbsp;
            <Button
              onClick={serviceWorker.askForInstallation}
              variant="outlined"
              color="primary"
              title="Install application"
            >
              Install
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1">
              This device or browser does not support the installation of the application, because PWAs are not
              supported. You can find an explanation&nbsp;
              <PWALink />
            </Typography>
          </>
        )}
      </Box>
    </>
  )
}
export default InstallButton
