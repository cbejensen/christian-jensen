import React from 'react'
import CornerCurveScatter from '../containers/CornerCurveScatter.js'
import RandomRotations from '../containers/RandomRotations.js'
import styled from 'styled-components'

export default class TriangleCurve extends React.Component {
  render() {
    const triangleSize = this.props.triangleSize
    return (
      <CornerCurveScatter
        width={this.props.width}
        height={this.props.height}
        float={this.props.float}
        itemSize={triangleSize}
        corner={this.props.corner}
      >
        {items => {
          // console.log(items)
          return (
            <RandomRotations itemsToRotate={items} rotationInterval={200}>
              {rotations => (
                <React.Fragment>
                  {items.map((item, i) => (
                    <StyledSVG
                      corner={this.props.corner}
                      item={item}
                      size={triangleSize}
                      key={i}
                    >
                      <Triangle
                        color={this.props.triangleColor}
                        rotation={rotations[i]}
                      />
                    </StyledSVG>
                  ))}
                </React.Fragment>
              )}
            </RandomRotations>
          )
        }}
      </CornerCurveScatter>
    )
  }
}

const StyledSVG = styled.svg.attrs({
  viewBox: '0 0 100 100'
})`
  position: absolute;
  overflow: visible;
  ${({ corner, item, size }) => getCoords(corner, item.x, item.y, size)};
`

function getCoords(corner, itemX, itemY, size) {
  let topOrBottom, rightOrLeft
  if (!corner) {
    // no corner set? use top left as default
    topOrBottom = 'top'
    rightOrLeft = 'left'
  } else {
    topOrBottom = corner.includes('bottom') ? 'bottom' : 'top'
    rightOrLeft = corner.includes('right') ? 'right' : 'left'
  }
  return `
    ${topOrBottom}: calc(${itemY}% - ${size}px);
    ${rightOrLeft}: calc(${itemX}% - ${size}px);
    width: ${size}px;
    height: ${size}px;
  `
}

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
