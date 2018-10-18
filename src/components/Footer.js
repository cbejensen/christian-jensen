import React from 'react'
import styled from 'styled-components'

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Link href="tel:+1-801-633-8055">801-633-8055</Link>
        <Link href="mailto:cbejensen@gmail.com">cbejensen@gmail.com</Link>
      </Container>
    )
  }
}

const Container = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 0.5em;
  background: ${props => props.theme.black};
`

const Link = styled.a`
  display: block;
  padding: 0.5em;
  min-width: 250px;
  text-align: center;
  color: ${props => props.theme.white};
`

export default Footer
