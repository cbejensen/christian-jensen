import React from 'react'

// TODO
// only one viewportwatcher for whole app
// maybe upgrade to React 16.3 and use context API

class ViewportWatcher extends React.Component {
  state = {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  }
  componentDidMount() {
    // this.updateSize()
    // listen for resize events, but use throttler to limit resource usage
    // https://developer.mozilla.org/en-US/docs/Web/Events/resize#setTimeout
    let resizeTimeout
    const resizeThrottler = () => {
      // ignore resize events as long as execution is in the queue
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          this.updateSize()
        }, 1000)
      }
    }
    this.resizeListener = window.addEventListener(
      'resize',
      resizeThrottler,
      false
    )
  }
  updateSize = () => {
    this.setState({
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }
  render() {
    return this.props.children(this.state)
  }
}

export default ViewportWatcher
