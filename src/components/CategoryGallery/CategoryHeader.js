import React from 'react'
import { Link } from 'react-static'
import { H2, withHash } from '../styled/Headings'
import styled from 'styled-components'

export default class CategoryHeader extends React.Component {
  render() {
    // if no hashLink is proivded, use the title, but replace
    // any spaces with dashes
    return (
      <Link
        to={`#${this.props.hashLink || this.props.title.replace(/ /, '-')}`}
      >
        <HashHeading
          id="projects"
          className="contained"
          style={this.props.style}
        >
          <HeadingText>{this.props.title}</HeadingText>
        </HashHeading>
      </Link>
    )
  }
}

const HashHeading = styled(withHash(H2))`
  position: relative;
  transition: 0.4s;
  overflow: hidden;
  :before {
    vertical-align: middle;
  }
  :after {
    content: '';
    background: ${props => props.theme.primaryColor};
    width: 100%;
    margin-right: -100%;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
  }
  :hover:after {
    background: ${props => props.theme.secondaryColor};
  }
`
const HeadingText = styled.span`
  padding-right: 10px;
  color: ${props => props.theme.black};
`
