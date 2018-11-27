import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import TriangleCurve from '../components/TriangleCurve'
import { FileText, Mail, Smartphone } from 'react-feather'
import SocialIcon from '../components/SocialIcon'
import { Link } from 'react-static'

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <TriangleCurve
          corner="bottom left"
          height="200%"
          width="40%"
          triangleColor={this.props.theme.secondaryColor}
          triangleSize="15-40"
        />
        <TriangleCurve
          corner="bottom right"
          height="200%"
          width="40%"
          triangleColor={this.props.theme.secondaryColor}
          triangleSize="15-40"
        />
        <Row>
          <StyledLink to="tel:+1-801-633-8055">
            <PhoneIcon />
            801-633-8055
          </StyledLink>
          <StyledLink to="mailto:cbejensen@gmail.com">
            <MailIcon />
            cbejensen@gmail.com
          </StyledLink>
          <StyledLink to="http://bit.ly/2q5EmOg" rel="external" download>
            <FileTextIcon />
            Resume
          </StyledLink>
        </Row>
        <Row>
          <StyledLink to="https://www.linkedin.com/in/cbejensen/" external>
            <SocialIcon icon="LinkedIn" />
          </StyledLink>
          <StyledLink to="https://github.com/cbejensen" external>
            <SocialIcon icon="GitHub" />
          </StyledLink>
          <StyledLink to="https://codepen.io/cbejensen/" external>
            <SocialIcon icon="CodePen" />
          </StyledLink>
          <StyledLink to="https://twitter.com/cbejensen" external>
            <SocialIcon icon="Twitter" />
          </StyledLink>
          <StyledLink to="https://www.facebook.com/cbejensen" external>
            <SocialIcon icon="Facebook" />
          </StyledLink>
        </Row>
      </Container>
    )
  }
}

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0.5em;
  background: ${props => props.theme.black};
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 0;
`

const iconStyles = css`
  margin-right: 6px;
  transition: transform 0.4s;
`

const PhoneIcon = styled(Smartphone)`
  ${iconStyles};
`
const MailIcon = styled(Mail)`
  ${iconStyles};
`
const FileTextIcon = styled(FileText)`
  ${iconStyles};
`

const StyledLink = styled(Link).attrs({
  rel: props => props.external && 'external noopener',
  target: props => props.external && '_blank'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  color: ${props => props.theme.white};
  :hover {
    color: ${props => props.theme.primaryColor};
  }
  :hover svg {
    transform: rotate(3deg) scale(1.1);
  }
`

export default withTheme(Footer)
