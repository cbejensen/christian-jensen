import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import TriangleCurve from '../components/TriangleCurve'
import { FileText, Mail, Smartphone } from 'react-feather'

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
          <Link href="tel:+1-801-633-8055">
            <PhoneIcon />
            801-633-8055
          </Link>
          <Link href="mailto:cbejensen@gmail.com">
            <MailIcon />
            cbejensen@gmail.com
          </Link>
        </Row>
        <Link href="http://bit.ly/2q5EmOg" rel="external" download>
          <FileTextIcon />
          Resume
        </Link>
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
`

const Icon = css`
  margin-right: 10px;
  :hover {
    color: inherit;
  }
`

const PhoneIcon = styled(Smartphone)`
  ${Icon};
`
const MailIcon = styled(Mail)`
  ${Icon};
`
const FileTextIcon = styled(FileText)`
  ${Icon};
`

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  min-width: 250px;
  color: ${props => props.theme.white};
`

export default withTheme(Footer)
