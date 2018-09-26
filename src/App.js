import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ThemeProvider, injectGlobal } from 'styled-components'

const theme = {
  black: '#171717',
  white: '#f1f1f1',
  gray: '#404040',
  primaryColor: '#c73d15',
  secondaryColor: '#108db8',
  maxContentWidth: '800px',
  media: {
    small: '500px',
    medium: '700px',
    large: '900px',
    xLarge: '1200px'
  }
}

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
      Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    color: ${theme.black};
    margin: 0;
    padding: 0;
    background: ${theme.white};
  }

  a {
    text-decoration: none;
    color: #108db8;
    font-weight: bold;
    transition: .3s;
  }
  a:hover {
    color: ${theme.primaryColor};
  }

  img {
    max-width: 100%;
  }

  .contained {
    max-width: ${theme.maxContentWidth};
    margin-left: auto;
    margin-right: auto;
  }
`

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Router>
)

export default hot(module)(App)
