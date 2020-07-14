import React from 'react'
import { Box } from '@material-ui/core'

type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // eslint-disable-next-line no-console
    console.error('Catched error in boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" flexGrow={1}>
          <h1>Something went wrong</h1>
          <h3>Please try again</h3>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
