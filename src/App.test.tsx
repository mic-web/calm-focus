import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import * as workers from './worker/web-workers'

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.spyOn(workers, 'loadWorker').mockImplementation((() => null) as any)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
