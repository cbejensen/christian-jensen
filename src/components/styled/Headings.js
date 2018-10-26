import styled, { css } from 'styled-components'

const fancyFont = css`
  /* only active when web-font loader adds active class to html */
  .wf-active & {
    font-family: 'Merienda';
  }
  letter-spacing: 2px;
`

export const H1 = styled.h1`
  ${fancyFont};
  font-size: 3rem;
  color: ${props => props.theme.black};
`
export const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: 200;
`
export const H3 = styled.h3`
  font-size: 1.4rem;
`

export const withHash = (heading, color, hoverColor) => styled(heading)`
  :before {
    content: '#';
    display: inline-block;
    color: ${color || (props => props.theme.secondaryColor)};
    margin-right: 8px;
    transition: 0.3s;
  }
  :hover:before {
    color: ${hoverColor || (props => props.theme.primaryColor)};
    transform: rotate(180deg);
  }
`
