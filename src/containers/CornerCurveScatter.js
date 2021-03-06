import React from 'react'
import CurveItems from './CurveItems'
import styled from 'styled-components'
import ViewportWatcher from './ViewportWatcher'
import DummyFloats from '../components/DummyFloats'

class CornerCurveScatter extends React.Component {
  setRef = elem => {
    this.containerRef = elem
    this.forceUpdate()
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
      // and subtract x from grid size to make this curve concave
      const y = gridSize - this.getExponentialInt(gridSize - x, gridSize)
      points.push({ x, y })
    }
    return points
  }
  render() {
    // if floated, use shape outside CSS prop if available
    // otherwise use DiagonalFloats component
    const useShapeOutside =
      this.props.float &&
      CSS.supports('shape-outside', 'polygon(0% 0%, 100% 0%, 0% 100%)')
    const useDummyFloats =
      this.props.useDummyFloats || (this.props.float && !useShapeOutside)
    const shapeOutsidePoints = useShapeOutside && this.getCurveBorderPoints(100)
    return (
      <React.Fragment>
        <Container
          innerRef={this.setRef}
          float={this.props.float}
          width={this.props.width}
          height={this.props.height}
          shapeOutsidePoints={this.containerRef && shapeOutsidePoints}
          corner={this.props.corner}
          style={this.props.containerStyles}
        >
          {this.containerRef && (
            <ViewportWatcher>
              {() => (
                <CurveItems
                  containerWidth={this.containerRef.clientWidth}
                  containerHeight={this.containerRef.clientHeight}
                  getExponentialInt={this.getExponentialInt}
                  maxItemNum={this.props.maxItemNum || 100}
                  maxItemSize={this.props.maxItemSize}
                  itemPadding={this.props.itemPadding}
                >
                  {items => this.props.children(items)}
                </CurveItems>
              )}
            </ViewportWatcher>
          )}
        </Container>
        {this.containerRef &&
          useDummyFloats && (
            <DummyFloats
              width={this.containerRef.clientWidth}
              height={this.containerRef.clientHeight}
              horizontal
            />
          )}
      </React.Fragment>
    )
  }
}
CornerCurveScatter.defaultProps = {
  width: '100%',
  height: '100%',
  maxItemSize: 20
}

const Container = styled.div`
  ${props => getPosition(props.corner)}
  width: ${props =>
    typeof props.width === 'number' ? props.width + 'px' : props.width};
  height: ${props =>
    typeof props.height === 'number' ? props.height + 'px' : props.height};
  ${props =>
    props.shapeOutsidePoints &&
    `shape-outside: ${getShape(props.shapeOutsidePoints)}`};
  pointer-events: none;
`

function getPosition(corner) {
  let position = 'absolute',
    float = 'none',
    topOrBottom = 'top',
    rightOrLeft = 'left'
  if (corner && corner.includes('float')) {
    position = 'relative'
    float = corner.includes('right') ? 'right' : 'left'
  } else if (corner) {
    topOrBottom = corner.includes('bottom') ? 'bottom' : 'top'
    rightOrLeft = corner.includes('right') ? 'right' : 'left'
  }
  return `
    position: ${position};
    float: ${float};
    ${topOrBottom}: ${float === 'none' ? 0 : 'initial'};
    ${rightOrLeft}: ${float === 'none' ? 0 : 'initial'};
  `
}

function getShape(points) {
  const shape = points.reduce(
    (acc, cur) => `${acc} ${cur.x}% ${cur.y}%, `,
    'polygon(0% 0%, '
  )
  // remove trailing comma
  return `${shape.slice(0, -2)})`
}

export default CornerCurveScatter
