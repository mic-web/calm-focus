import { useEffect, useRef } from 'react'

/**
 *  Pass a 'callback' which will be called every 'delay' milliseconds.
 *  @param callback - Function to be called after delay
 *  @param delay - Delay next function call. If null, the interval will be stopped.
 * */
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return undefined
  }, [delay])
}

export default useInterval
