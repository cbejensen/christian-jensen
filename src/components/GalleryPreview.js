import React from 'react'
import { Link } from 'react-static'
import { H1 } from '../components/Heading'
import styled from 'styled-components'

export default class GalleryPreview extends React.Component {
  render() {
    return (
      <Link to="#projects">
        <H1 id="projects">{this.props.title}</H1>
      </Link>
    )
  }
}

// const StyledLink = styled(Link)`
//   color: ${theme => }
// `
