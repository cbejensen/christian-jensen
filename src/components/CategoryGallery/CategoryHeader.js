import React from 'react'
import { Link } from 'react-static'
import { H2, withHash } from '../styled/Headings'
import styled from 'styled-components'

export default class CategoryHeader extends React.Component {
  render() {
    return (
      <Link to="#projects">
        <HashHeading id="projects" className="contained">
          <HeadingText>{this.props.title}</HeadingText>
        </HashHeading>
      </Link>
    )
  }
}

const HashHeading = styled(withHash(H2))`
  color: ${props => props.theme.black};
  position: relative;
  margin-bottom: 0.5em;
  transition: 0.4s;
  :before {
    background: ${props => props.theme.white};
  }
  :after {
    content: '';
    background: ${props => props.theme.primaryColor};
    width: 100%;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: -1;
  }
  :hover:after {
    background: ${props => props.theme.secondaryColor};
  }
`
const HeadingText = styled.span`
  background: ${props => props.theme.white};
  padding-right: 10px;
`
