import React from 'react'
import _ from 'lodash'

function useKeyboardEvent(
  eventType: 'keydown' | 'keyup',
  key: string,
  callback: (event: KeyboardEvent) => void,
  isEnabled: boolean
) {
  const debouncedCallback = React.useMemo(
    () =>
      _.debounce(callback, 300, {
        leading: true,
        trailing: true,
      }),
    [callback]
  )

  React.useEffect(() => {
    const match = (event: KeyboardEvent) => key.toLowerCase() === event.key.toLowerCase()

    const onEvent = (event: KeyboardEvent) => {
      if (match(event) && isEnabled) {
        debouncedCallback(event)
      }
    }
    window.addEventListener(eventType, onEvent)
    return () => {
      window.removeEventListener(eventType, onEvent)
    }
  }, [key, callback, isEnabled, eventType, debouncedCallback])
}

export default useKeyboardEvent
