import React from 'react'

export default (preventDefault: boolean) => {
  React.useEffect(() => {
    if (preventDefault) {
      const handleBeforeUnload = (event: Event) => event.preventDefault()
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
    return undefined
  }, [preventDefault])
}
