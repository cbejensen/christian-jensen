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
  }
  updateSize = () => {
    if (this.containerRef) {
      this.setState({
        width: this.containerRef.clientWidth,
        height: this.containerRef.clientHeight
      })
    }
  }
  render() {
    // if (!this.state.width || !this.state.height) return null
    const shapeOutsideSupported = CSS.supports(
      'shape-outside',
      'polygon(0% 0%, 100% 0%, 0% 100%)'
    )
    return (
      <CurvePoints num={100}>
        {curveBorderPoints => (
          <Container
            innerRef={elem => (this.containerRef = elem)}
            float={this.props.float}
            width={this.props.width}
            height={this.props.height}
            shapeOutsidePoints={shapeOutsideSupported && curveBorderPoints}
          >
            {this.state.width &&
              this.state.height && (
                <CurvePoints
                  random
                  num={
                    this.props.maxItems ||
                    getMaximumNumOfItems(
                      this.props.itemSize,
                      this.state.width,
                      this.state.height
                    )
                  }
                >
                  {randomPoints => (
                    <CurveItems
                      points={randomPoints}
                      containerWidth={this.state.width}
                      containerHeight={this.state.height}
                      itemSize={this.props.itemSize}
                      preventOverlap={this.props.preventOverlap}
                      randomlyRotate={this.props.randomlyRotate}
                    >
                      {item => this.props.children(item)}
                    </CurveItems>
                  )}
                </CurvePoints>
              )}
          </Container>
        )}
      </CurvePoints>
    )
  }
}
CornerCurve.defaultProps = {
  width: '100%',
  height: '100%',
  itemSize: 20
}

const Container = styled.div`
  float: ${props => (props.float ? 'left' : 'none')};
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

function getMaximumNumOfItems(itemSize, width, height) {
  // TODO: make this rough estimate more exact
  const approxXCapacity = width / itemSize
  const approxYCapacity = height / itemSize
  return Math.ceil((approxXCapacity * approxYCapacity) / 2)
}

export default CornerCurve
