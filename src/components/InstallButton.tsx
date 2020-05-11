import React from 'react'

import { States } from '../types'

import IconButton from './IconButton'
import DownloadIcon from '../icons/DownloadIcon'
import * as serviceWorker from '../service-worker'

type InstallButtonProps = {
  state: States
  className?: string
}

const InstallButton: React.FC<InstallButtonProps> = ({ state }) => {
  const [isInstallable, setIsInstallable] = React.useState(serviceWorker.installAlreadyPossible())
  React.useEffect(() => {
    serviceWorker.onInstallPossible(() => setIsInstallable(true))
  }, [])
  return (
    <IconButton
      invisible={!isInstallable}
      onClick={serviceWorker.askForInstallation}
      highlight={state === States.WORK_READY}
      title="Install application"
      small
    >
      <DownloadIcon />
    </IconButton>
  )
}

export default InstallButton
