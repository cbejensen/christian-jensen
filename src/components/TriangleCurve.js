import React from 'react'
import CornerCurveScatter from '../containers/CornerCurveScatter.js'
import RandomRotations from '../containers/RandomRotations.js'
import styled from 'styled-components'
import { getRandomInt } from '../utils.js'

export default class TriangleCurve extends React.Component {
  render() {
    let maxTriangleSize
    let rangeOfSizes = false
    let arrayOfSizes = false
    if (typeof this.props.triangleSize === 'number') {
      // every triangle is the same size
      maxTriangleSize = this.props.triangleSize
    } else if (typeof this.props.triangleSize === 'string') {
      // range of sizes, i.e. 10 - 100
      // max is the 2nd number in the string
      maxTriangleSize = parseInt(this.props.triangleSize.split('-')[1])
      rangeOfSizes = true
    } else if (typeof this.props.triangleSize === 'object') {
      // array of possible sizes, i.e. [10, 20, 30]
      const largeToSmall = this.props.triangleSize.sort(
        (a, b) => (a < b ? 1 : -1)
      )
      maxTriangleSize = largeToSmall[0]
      arrayOfSizes = true
    }
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
        maxItemSize={maxTriangleSize}
        corner={this.props.corner}
      >
        {items => {
          let randomSizes = false
          if (rangeOfSizes) {
            let sizeRange = this.props.triangleSize
            const bottom = parseInt(sizeRange.split('-')[0])
            const top = parseInt(sizeRange.split('-')[1])
            randomSizes = items.map(() => getRandomInt(bottom, top))
          } else if (arrayOfSizes) {
            let sizeArray = this.props.triangleSize
            randomSizes = items.map(() => {
              let randomIndex = getRandomInt(0, sizeArray.length - 1)
              return sizeArray[randomIndex]
            })
          }
          return (
            <RandomRotations itemsToRotate={items} rotationInterval={200}>
              {rotations =>
                items.map((item, i) => (
                  <StyledSVG
                    xReference={xReference}
                    yReference={yReference}
                    x={item.x}
                    y={item.y}
                    size={randomSizes ? randomSizes[i] : maxTriangleSize}
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
