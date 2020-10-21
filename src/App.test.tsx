import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

import * as workers from './worker/web-workers'

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.spyOn(workers, 'loadWorker').mockImplementation(() => null as any)

describe('App', () => {
  test('renders App and Header component', () => {
    render(<App />)

    expect(screen.getByText('25')).toBeInTheDocument()
  })
})
