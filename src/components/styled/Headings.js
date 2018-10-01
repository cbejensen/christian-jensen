import styled from 'styled-components'

export const H1 = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.black};
`
export const H2 = styled.h2`
  font-size: 40px;
`
export const H3 = styled.h3`
  font-size: 32px;
`
export const H4 = styled.h4`
  font-size: 24px;
`

export const withHash = (heading, color, hoverColor) => styled(heading)`
  :before {
    content: '#';
    color: ${color || (props => props.theme.primaryColor)};
    padding-right: 8px;
    transition: 0.3s;
  }
  :hover:before {
    color: ${hoverColor || (props => props.theme.secondaryColor)};
  }
`
