import React from 'react'

export default (preventDefault: boolean) => {
  React.useEffect(() => {
    window.onbeforeunload = (event: Event) => {
      if (preventDefault) {
        event.preventDefault()
        return ''
      }
    }
    return undefined
  }, [preventDefault])
}
