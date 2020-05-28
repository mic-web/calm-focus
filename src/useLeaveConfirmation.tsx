import React from 'react'

const showConfirmation = (e: Event) => {
  // const confirmationMessage = 'o/'
  const confirmationMessage = true

  ;(e || window.event).returnValue = confirmationMessage // Gecko + IE
  return confirmationMessage // Webkit, Safari, Chrome
}

const useLeaveConfirmation = (active: boolean) => {
  const eventName = 'beforeunload'
  const handler = React.useCallback(
    (e: Event) => {
      if (active) {
        showConfirmation(e)
      }
    },
    [active]
  )

  React.useEffect(() => {
    window.addEventListener(eventName, handler)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener(eventName, handler)
    }
  }, [handler])
}

export default useLeaveConfirmation
