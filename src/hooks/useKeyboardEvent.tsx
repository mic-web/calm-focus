import React from 'react'
import _ from 'lodash'

function useKeyboardEvent(
  eventType: 'keydown' | 'keyup',
  key: string,
  callback: (event: KeyboardEvent) => void,
  isEnabled = true
) {
  const debouncedCallback = React.useRef(
    // Debounce sync to outer value to avoid race conditions
    _.throttle((fn: () => void) => fn(), 50, { leading: true, trailing: true })
  )

  React.useEffect(() => {
    const match = (event: KeyboardEvent) => key.toLowerCase() === event.key.toLowerCase()

    const onEvent = (event: KeyboardEvent) => {
      if (match(event) && isEnabled) {
        debouncedCallback.current(() => callback(event))
      }
    }
    window.addEventListener(eventType, onEvent)
    return () => {
      window.removeEventListener(eventType, onEvent)
    }
  }, [key, callback, isEnabled, eventType, debouncedCallback])
}

export default useKeyboardEvent
