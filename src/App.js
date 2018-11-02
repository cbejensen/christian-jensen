import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { CloudinaryContext } from 'cloudinary-react'
import WebFont from 'webfontloader'
import 'normalize.css'

WebFont.load({
  google: {
    families: ['Merienda']
  }
})

const theme = {
  primaryColor: '#c73d15',
  secondaryColor: '#108db8',
  fancyFont: 'Merienda',
  standardFont:
    'system-ui, "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
  black: '#171717',
  white: '#f1f1f1',
  lightGray: '#e2e2e2',
  darkGray: '#404040',
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
    line-height: 1.5;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    font-family: ${theme.standardFont};
    font-weight: 300;
    font-size: 16px;
    line-height: 1.5;
    color: ${theme.black};
    margin: 0;
    padding: 0;
    background: ${theme.white};
  }

  *:focus {
    outline: none;
  }
  body.user-is-tabbing *:focus {
    outline: 5px auto ${theme.secondaryColor};
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

  img, video {
    max-width: 100%;
  }

  .contained {
    max-width: ${theme.maxContentWidth};
    margin-left: auto;
    margin-right: auto;
  }

  dialog::backdrop {
    display: none;
  }
`

// if user starts tabbing, add class to body for focus rings
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

// if user clicks, remove tabbing class to avoid focus rings
function handleMouseDownOnce() {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

// make sure we're in browser before activating tab listening
// https://react-static.js.org/docs/concepts/#writing-universal-node-safe-code
if (typeof window !== 'undefined')
  window.addEventListener('keydown', handleFirstTab)

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <CloudinaryContext cloudName="cbejensen">
        <Routes />
      </CloudinaryContext>
    </ThemeProvider>
  </Router>
)

export default hot(module)(App)
