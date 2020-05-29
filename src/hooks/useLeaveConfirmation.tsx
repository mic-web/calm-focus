import React from 'react'

const showConfirmation = () => {
  return 'Time will be reset if you leave'
}

export default (active: boolean) => {
  const eventName = 'beforeunload'
  const handler = React.useCallback(() => {
    if (active) {
      showConfirmation()
    }
  }, [active])

  React.useEffect(() => {
    window.addEventListener(eventName, handler)

    return () => {
      window.removeEventListener(eventName, handler)
    }
  }, [handler])
}
