import React from 'react'

class ViewportWatcher extends React.Component {
  state = {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  }
  setRef = elem => {
    this.ref = elem
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
          // will execute at a rate of 15fps
        }, 66)
      }
    }
    this.resizeListener = window.addEventListener(
      'resize',
      resizeThrottler,
      false
    )
  }
  updateSize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
    // if (this.containerRef) {
    //   this.setState({
    //     width: this.containerRef.clientWidth,
    //     height: this.containerRef.clientHeight
    //   })
    // }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }
  render() {
    return React.Children.only(this.props.children(this.state))
  }
}

export default ViewportWatcher
