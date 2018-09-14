import React from 'react'
import CurvePoints from '../components/CurvePoints'
import CurveItems from './CurveItems'
import styled from 'styled-components'

class CornerCurve extends React.Component {
  state = {
    width: 0,
    height: 0
  }
  componentDidMount() {
    this.updateSize()
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
    if (this.containerRef) {
      this.setState({
        width: this.containerRef.clientWidth,
        height: this.containerRef.clientHeight
      })
    }
  }
  getExponentialInt = (int, max) => {
    return Math.floor(Math.sqrt(Math.pow(max, 2) - Math.pow(int, 2)))
  }
  getCurveBorderPoints = gridSize => {
    // returns the x,y coords (points) along a slope
    // (i.e. the border of the curve)
    // where slope goes from top left to bottom right
    const points = []
    for (var i = 0; i <= gridSize; i++) {
      const x = i
      // subtract from grid size to flip the curve
      // and subtract x from grid zie to make this curve concave
      const y = gridSize - this.getExponentialInt(gridSize - x, gridSize)
      points.push({ x, y })
    }
    return points
  }
  componentWillUnmount() {
    window.removeEventListener(this.resizeListener)
  }
  render() {
    const useShapeOutside =
      this.props.float &&
      CSS.supports('shape-outside', 'polygon(0% 0%, 100% 0%, 0% 100%)')
    const shapeOutsidePoints = useShapeOutside && this.getCurveBorderPoints(100)
    const showCurveItems = this.state.width && this.state.height
    return (
      <Container
        innerRef={elem => (this.containerRef = elem)}
        float={this.props.float}
        width={this.props.width}
        height={this.props.height}
        shapeOutsidePoints={shapeOutsidePoints}
      >
        {showCurveItems && (
          <CurveItems
            getExponentialInt={this.getExponentialInt}
            maxItems={
              this.props.maxItems ||
              getApproxMaxItems(
                this.props.itemSize,
                this.state.width,
                this.state.height
              )
            }
            containerWidth={this.state.width}
            containerHeight={this.state.height}
            itemSize={this.props.itemSize}
            preventOverlap={this.props.preventOverlap}
          >
            {item => this.props.children(item)}
          </CurveItems>
        )}
      </Container>
    )
  }
}
CornerCurve.defaultProps = {
  width: '100%',
  height: '100%',
  itemSize: 20
}

const Container = styled.div`
  float: ${props => props.float || 'none'};
  pointer-events: none;
  position: ${props =>
    props.float && props.shapeOutsidePoints ? 'relative' : 'absolute'};
  width: ${props => props.width};
  height: ${props => props.height};
  ${props =>
    props.shapeOutsidePoints &&
    `shape-outside: ${getShape(props.shapeOutsidePoints)}`};
`

function getShape(points) {
  const shape = points.reduce(
    (acc, cur, index) => `${acc} ${cur.x}% ${cur.y}%, `,
    'polygon(0% 0%, '
  )
  // remove trailing comma
  return `${shape.slice(0, -2)})`
}

function getApproxMaxItems(itemSize, width, height) {
  // TODO: make this rough estimate more exact
  const approxXCapacity = width / itemSize
  const approxYCapacity = height / itemSize
  return Math.ceil((approxXCapacity * approxYCapacity) / 4)
}

export default CornerCurve
