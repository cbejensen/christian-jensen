import React from 'react'
import { Link } from 'react-static'
import { H2, withHash } from '../styled/Headings'
import styled from 'styled-components'

export default class CategoryHeader extends React.Component {
  render() {
    // if no hashLink is proivded, use the title, but replace
    // any spaces with dashes
    const hashLink = this.props.hashLink || this.props.title.replace(/ /, '-')
    return (
      <Link to={`#${hashLink}`}>
        <HashHeading id={hashLink} className="contained">
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
    outline: none;
  }
  :after {
    content: '';
    background: ${props => props.theme.secondaryColor};
    width: 100%;
    margin-right: -100%;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
    outline: none;
  }
  :hover:before {
    transform: rotate(180deg);
  }
  :hover:after {
    background: ${props => props.theme.primaryColor};
  }
`
const HeadingText = styled.span`
  padding-right: 10px;
  color: ${props => props.theme.black};
  font-weight: 200;
`
