import React from 'react'

import { IconButton, SvgIcon } from '@material-ui/core'
import DownloadIcon from '../icons/DownloadIcon'
import * as serviceWorker from '../service-worker'

type InstallButtonProps = {
  className?: string
}

const InstallButton: React.FC<InstallButtonProps> = () => {
  const [isInstallable, setIsInstallable] = React.useState(serviceWorker.installAlreadyPossible())
  React.useEffect(() => {
    serviceWorker.onInstallPossible(() => setIsInstallable(true))
  }, [])
  return (
    <IconButton
      // invisible={!isInstallable}
      onClick={serviceWorker.askForInstallation}
      title="Install application"
      // small
      // label="Install application"
    >
      <SvgIcon>
        <DownloadIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default InstallButton
