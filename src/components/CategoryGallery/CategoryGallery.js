import React from 'react'
import CategoryHeader from './CategoryHeader'
import CategoryBlocks from './CategoryBlocks'
import styled from 'styled-components'

export default class CategoryGallery extends React.Component {
  render() {
    // TODO: Control all heading levels (h1, h2, etc) here
    return (
      <React.Fragment>
        <CategoryHeader
          title={this.props.title}
          style={this.props.headerStyle}
        />
        <CategoryBlocks items={this.props.items} />
      </React.Fragment>
    )
  }
}
