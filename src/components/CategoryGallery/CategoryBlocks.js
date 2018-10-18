import React from 'react'
import CategoryBlock from './CategoryBlock'
import styled from 'styled-components'

export default class CategoryBlocks extends React.Component {
  render() {
    return (
      <Container>
        {this.props.items.map(item => (
          <CategoryBlock {...item} key={item.id} />
        ))}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
