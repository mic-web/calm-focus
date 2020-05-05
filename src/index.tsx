import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const renderRootElement = (Element: React.SFC) => {
  ReactDOM.render(<Element />, document.getElementById('root'))
}

renderRootElement(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    renderRootElement(require('./App').default)
  })
}
