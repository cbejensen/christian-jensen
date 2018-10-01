import React from 'react'
import CornerCurveScatter from '../components/CornerCurveScatter.js'
import RandomRotations from '../containers/RandomRotations.js'
import styled from 'styled-components'

export default class TriangleCurve extends React.Component {
  render() {
    console.log(this.props.triangleColor)

    return (
      <CornerCurveScatter
        width={this.props.width}
        height={this.props.height}
        float={this.props.float}
        itemSize={this.props.triangleSize}
        positionRight={this.props.positionRight}
        positionBottom={this.props.positionBottom}
        containerStyles={this.props.containerStyles}
      >
        {items => (
          <RandomRotations itemsToRotate={items} rotationInterval={500}>
            {rotations => (
              <React.Fragment>
                {items.map((item, i) => (
                  <StyledSVG
                    positionRight={this.props.positionRight}
                    positionBottom={this.props.positionBottom}
                    item={item}
                    size={this.props.triangleSize}
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
        )}
      </CornerCurveScatter>
    )
  }
}

const StyledSVG = styled.svg.attrs({
  viewBox: '0 0 100 100'
})`
  position: absolute;
  overflow: visible;
  /* mix-blend-mode: difference; */
  ${({ item, size, ...props }) => `
    ${props.positionRight ? 'right' : 'left'}: calc(${item.y}% - ${
    item.size
  }px);
    ${props.positionBottom ? 'bottom' : 'top'}: calc(${item.x}% - ${
    item.size
  }px);
    width: ${size}px;
    height: ${size}px;
  `};
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
