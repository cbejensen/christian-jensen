import React from 'react'
import styled from 'styled-components'

class Triangle extends React.PureComponent {
  componentDidMount() {
    console.log('mounted')
  }
  componentDidUpdate() {
    console.log('updated')
  }
  render() {
    const { x, y, rotation, width, style, ...otherProps } = this.props
    return (
      <StyledSVG x={x} y={y} width={width}>
        <polygon
          points="50 0 100 100 0 100"
          stroke="#333"
          fill="transparent"
          vectorEffect="non-scaling-stroke"
          transform={`rotate(${rotation || 0} 50 50)`}
          style={{ transition: '.5s' }}
        />
      </StyledSVG>
    )
  }
}

const StyledSVG = styled.svg.attrs({
  viewBox: '0 0 100 100'
})`
  position: absolute;
  overflow: visible;
  ${props => `
    left: calc(${props.x}% - ${props.width});
    top: calc(${props.y}% - ${props.width});
    width: ${props.width};
    height: ${props.width};
  `};
`

export default Triangle
