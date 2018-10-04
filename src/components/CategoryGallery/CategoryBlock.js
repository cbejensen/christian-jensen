import React from 'react'
import styled from 'styled-components'
import { H3 } from '../styled/Headings'
import TriangleCurve from '../TriangleCurve'

export default class CategoryBlock extends React.Component {
  setDialogRef = elem => {
    this.dialogRef = elem
  }
  showModal = () => {
    this.dialogRef.showModal()
  }
  render() {
    // TODO: move inline styles into styled-components
    const transitionSpeed = '0.4s'
    return (
      <React.Fragment>
        <Block onClick={this.showModal}>
          <Image
            src={this.props.img}
            alt={this.props.alt}
            transitionSpeed={transitionSpeed}
          />
          <Caption transitionSpeed={transitionSpeed}>
            {this.props.title}
          </Caption>
        </Block>
        <Dialog innerRef={this.setDialogRef}>
          <H3>{this.props.title}</H3>
          <Description>{this.props.description}</Description>
          <TriangleCurve
            triangleSize={15}
            triangleColor="gray"
            width="100%"
            height="200px"
            corner="bottom right"
          />
        </Dialog>
      </React.Fragment>
    )
  }
}

const Block = styled.figure`
  position: relative;
  margin: 30px 30px 5em;
  max-width: 400px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
  @media (min-width: ${props => props.theme.media.medium}) {
    flex: 1;
    min-width: 100px;
  }
`

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  transition: ${props => props.transitionSpeed};
  ${Block}:hover & {
    transform: scale(1.1);
    box-shadow: 8px 8px 30px #000;
    filter: blur(1px);
  }
`

const Caption = styled.figcaption`
  position: absolute;
  top: calc(100% + 0.5em);
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 1.5em;
  transition: ${props => props.transitionSpeed};
  background: ${props => props.theme.white};
  ${Block}:hover & {
    top: calc(50%);
    transform: translate(-50%, -50%) scale(1.8) rotate(4deg);
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.white};
    padding: 5px;
  }
`

const Dialog = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  cursor: default;
`

const Description = styled.p`
  white-space: pre-wrap;
  line-height: 1.5em;
  text-align: left;
`
