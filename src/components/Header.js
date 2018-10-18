import React from 'react'
import TriangleCurve from '../components/TriangleCurve'
import styled from 'styled-components'
import { H1 } from '../components/styled/Headings.js'

class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <TriangleCurve
          triangleSize="15-40"
          triangleColor="gray"
          width="50%"
          height="100%"
        />
        <TriangleCurve
          triangleSize="15-40"
          triangleColor="gray"
          width="50%"
          height="100%"
          corner="right"
        />
        <HeaderSticks height={this.props.height}>
          <HeaderStick>Christian</HeaderStick>
          <HeaderStick>Jensen</HeaderStick>
        </HeaderSticks>
      </HeaderContainer>
    )
  }
}

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vw;
  overflow: hidden;
`

const HeaderSticks = styled(H1)`
  position: absolute;
  top: 0;
  height: ${props => props.height};
  width: 100%;
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
`

const HeaderStick = styled.div`
  width: 200vw;
  position: absolute;
  left: -50%;
  margin-top: 10px;
  color: ${props => props.theme.white};
  padding: 5px;
  text-align: center;
  z-index: ${props => props.zIndex};
  :first-child {
    top: 0;
    transform: rotate(-7deg);
    background: linear-gradient(
      to right,
      ${props => props.theme.darkGray},
      ${props => props.theme.primaryColor} 50%
    );
  }
  :nth-child(2) {
    top: 2em;
    transform: rotate(6deg);
    background: linear-gradient(
      to left,
      ${props => props.theme.darkGray},
      ${props => props.theme.primaryColor} 50%
    );
    z-index: ${props => props.theme.zIndexes.headerStickLower};
  }
`
export default Header
