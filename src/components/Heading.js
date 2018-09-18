import React from 'react'
import styled from 'styled-components'

export const H1 = styled.h1`
  font-size: 40px;
  color: ${props => props.theme.black};
  :before {
    color: ${props => props.theme.primaryColor};
    content: '#';
    padding-right: 8px;
  }
  :hover:before {
    color: ${props => props.theme.secondaryColor};
  }
`
export const H2 = styled.h2`
  font-size: 32px;
`
export const H3 = styled.h3`
  font-size: 24px;
`
export const H4 = styled.h4`
  font-size: 20px;
`
