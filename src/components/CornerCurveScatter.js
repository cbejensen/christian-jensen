import React from 'react'
import CurveItems from '../containers/CurveItems'
import styled from 'styled-components'
import ViewportWatcher from '../containers/ViewportWatcher'

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
      // and subtract x from grid zie to make this curve concave
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
    const useDiagonalFloats = this.props.float && !useShapeOutside
    const shapeOutsidePoints = useShapeOutside && this.getCurveBorderPoints(100)
    const containerHasSize =
      this.containerRef &&
      this.containerRef.clientWidth &&
      this.containerRef.clientHeight
    return (
      <React.Fragment>
        <Container
          innerRef={elem => !this.containerRef && this.setRef(elem)}
          float={this.props.float}
          width={this.props.width}
          height={this.props.height}
          shapeOutsidePoints={containerHasSize && shapeOutsidePoints}
        >
          {containerHasSize && (
            <ViewportWatcher>
              {() => (
                <CurveItems
                  containerWidth={this.containerRef.clientWidth}
                  containerHeight={this.containerRef.clientHeight}
                  getExponentialInt={this.getExponentialInt}
                  maxItems={
                    this.props.maxItems ||
                    getApproxMaxItems(
                      this.props.itemSize,
                      this.containerRef.clientWidth,
                      this.containerRef.clientHeight
                    )
                  }
                  itemSize={this.props.itemSize}
                  itemPadding={this.props.itemPadding}
                >
                  {items => React.Children.only(this.props.children(items))}
                </CurveItems>
              )}
            </ViewportWatcher>
          )}
        </Container>
        {containerHasSize &&
          useDiagonalFloats && (
            <DiagonalFloats
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
  itemSize: 20
}

const Container = styled.div`
  float: ${props => props.float || 'none'};
  position: ${props =>
    props.float && props.shapeOutsidePoints ? 'relative' : 'absolute'};
  width: ${props =>
    typeof props.width === 'number' ? props.width + 'px' : props.width};
  height: ${props =>
    typeof props.height === 'number' ? props.height + 'px' : props.height};
  ${props =>
    props.shapeOutsidePoints &&
    `shape-outside: ${getShape(props.shapeOutsidePoints)}`};
  pointer-events: none;
`

function getShape(points) {
  const shape = points.reduce(
    (acc, cur) => `${acc} ${cur.x}% ${cur.y}%, `,
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

export default CornerCurveScatter
