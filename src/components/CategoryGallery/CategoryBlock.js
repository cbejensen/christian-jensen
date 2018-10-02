import React from 'react'
import styled from 'styled-components'
import { H3 } from '../styled/Headings'

export default class CategoryBlock extends React.Component {
  setDialogRef = elem => {
    this.dialogRef = elem
  }
  showModal = () => {
    this.dialogRef.showModal()
  }
  render() {
    // TODO: move inline styles into styled-components
    return (
      <Block onClick={this.showModal}>
        <Image src={this.props.img} alt={this.props.alt} />
        <Caption>{this.props.title}</Caption>
        <Dialog innerRef={this.setDialogRef}>
          <H3>{this.props.title}</H3>
          <p>{this.props.description}</p>
        </Dialog>
      </Block>
    )
  }
}

const Block = styled.figure`
  position: relative;
  margin: 30px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`

const Image = styled.img`
  width: 90%;
  transition: 0.5s;
  box-shadow: 2px 2px 10px #000;
  ${Block}:hover & {
    transform: scale(1.1);
    box-shadow: 8px 8px 30px #000;
    opacity: 0.6;
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
  transition: 0.6s;
  ${Block}:hover & {
    top: calc(50%);
    transform: translate(-50%, -50%) scale(1.8);
  }
`

const Dialog = styled.dialog`
  cursor: default;
`
