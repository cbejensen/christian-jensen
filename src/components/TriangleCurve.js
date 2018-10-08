import React from 'react'
import CornerCurveScatter from '../containers/CornerCurveScatter.js'
import RandomRotations from '../containers/RandomRotations.js'
import styled from 'styled-components'

export default class TriangleCurve extends React.Component {
  render() {
    const triangleSize = this.props.triangleSize
    let xReference = 'left',
      yReference = 'top'
    if (this.props.corner) {
      xReference = this.props.corner.includes('right') ? 'right' : 'left'
      yReference = this.props.corner.includes('bottom') ? 'bottom' : 'top'
    }
    return (
      <CornerCurveScatter
        width={this.props.width}
        height={this.props.height}
        float={this.props.float}
        itemSize={triangleSize}
        corner={this.props.corner}
      >
        {items => {
          return (
            <RandomRotations itemsToRotate={items} rotationInterval={200}>
              {rotations =>
                items.map((item, i) => (
                  <StyledSVG
                    xReference={xReference}
                    yReference={yReference}
                    x={item.x}
                    y={item.y}
                    size={triangleSize}
                    key={i}
                  >
                    <Triangle
                      color={this.props.triangleColor}
                      rotation={rotations[i]}
                    />
                  </StyledSVG>
                ))
              }
            </RandomRotations>
          )
        }}
      </CornerCurveScatter>
    )
  }
}

const StyledSVG = styled.svg.attrs({
  viewBox: '0 0 100 100',
  style: props => ({
    [props.xReference]: `calc(${props.x}% - ${props.size}px)`,
    [props.yReference]: `calc(${props.y}% - ${props.size}px)`,
    width: `${props.size}px`,
    height: `${props.size}px`
  })
})`
  position: absolute;
  overflow: visible;
`

const Triangle = styled.polygon.attrs({
  points: '50 0 100 100 0 100',
  stroke: props => props.color || '#000',
  fill: 'transparent',
  vectorEffect: 'non-scaling-stroke',
  style: props => ({
    transform: `rotate(${props.rotation || 0}deg)`
  })
})`
  transform-origin: center;
  transition: 0.5s;
`
