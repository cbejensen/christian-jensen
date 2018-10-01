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
  padding: 0 15px 2rem;
  margin: 0 0 30px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`

const Image = styled.img`
  width: 90%;
  transition: 0.7s;
  ${Block}:hover & {
    width: 100%;
    box-shadow: 5px 5px 30px 5px #000;
  }
`

const Caption = styled.figcaption`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: 1.5em;
  transition: 0.7s;
  ${Block}:hover & {
    bottom: calc(50% + 2rem);
    transform: translate(-50%, 50%) scale(1.8);
    color: ${props => props.theme.primaryColor};
  }
`

const Dialog = styled.dialog`
  cursor: default;
`
