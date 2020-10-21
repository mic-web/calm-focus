import React from 'react'

export default (preventDefault: boolean) => {
  React.useEffect(() => {
    window.onbeforeunload = (event: Event) => {
      if (preventDefault) {
        event.preventDefault()
        return ''
      }
      return null
    }
    return undefined
  }, [preventDefault])
}
