import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ThemeProvider } from 'styled-components'

import './app.css'
const theme = {
  black: '#171717',
  white: '#f1f1f1',
  primaryColor: 'tomato',
  secondaryColor: '#108db8'
}

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Router>
)

export default hot(module)(App)
