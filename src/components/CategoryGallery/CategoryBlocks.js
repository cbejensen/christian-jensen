import React from 'react'
import CategoryBlock from './CategoryBlock'
import styled from 'styled-components'

export default class CategoryBlocks extends React.Component {
  render() {
    return (
      <div>
        <Container>
          {this.props.items.map(item => (
            <CategoryBlock {...item} key={item.id} />
          ))}
        </Container>
      </div>
    )
  }
}

const Container = styled.div`
  display: flex;
  white-space: nowrap;
  flex-wrap: wrap;
  justify-content: center;
`
