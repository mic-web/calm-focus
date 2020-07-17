import React from 'react'
import { Box, Typography } from '@material-ui/core'

type State = {
  hasError: boolean
  errorDescription: string
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false, errorDescription: '' }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorDescription: error.message }
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
          <Box mt="auto" mb={2}>
            <Typography variant="body2">{this.state.errorDescription}</Typography>
          </Box>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
