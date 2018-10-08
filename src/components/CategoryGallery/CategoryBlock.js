import React from 'react'
import styled from 'styled-components'
import { H3 } from '../styled/Headings'
import TriangleCurve from '../TriangleCurve'

export default class CategoryBlock extends React.Component {
  state = {
    showDialog: false
  }
  setCloseBtnRef = elem => {
    // used to set focus on close button when dialog is opened
    this.closeBtnRef = elem
  }
  showDialog = () => {
    this.setState({ showDialog: true })
    this.closeBtnRef.focus()
  }
  closeDialog = e => {
    this.setState({ showDialog: false })
  }
  focus = () => {
    this.closeBtnRef.focus()
  }
  render() {
    const transitionSpeed = '0.4s'
    return (
      <React.Fragment>
        <Block onClick={this.showDialog}>
          <figure>
            <Image
              src={this.props.img}
              alt={this.props.alt}
              transitionSpeed={transitionSpeed}
            />
            <Caption transitionSpeed={transitionSpeed}>
              {this.props.title}
            </Caption>
          </figure>
        </Block>
        <DialogBackdrop show={this.state.showDialog} onClick={this.focus} />
        <Dialog open={this.state.showDialog}>
          <CloseBtn
            innerRef={this.setCloseBtnRef}
            onClickCapture={this.closeDialog}
            tabbable={this.state.showDialog}
          >
            &times;
          </CloseBtn>
          <H3>{this.props.title}</H3>
          <Description>{this.props.description}</Description>
          <TriangleCurve
            triangleSize="10-20"
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

const Block = styled.button`
  position: relative;
  display: block;
  background: none;
  border: none;
  margin: 30px 30px 5em;
  min-width: 300px;
  max-width: 1000px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none !important;
  }
  @media (min-width: ${props => props.theme.media.medium}) {
    flex: 1;
  }
`

const Image = styled.img`
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  transition: ${props => props.transitionSpeed};
  ${Block}:hover &,
  ${Block}:focus & {
    transform: scale(1.1);
    box-shadow: 8px 8px 30px #000;
    filter: blur(1px);
    outline: none;
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
  ${Block}:hover &,
  ${Block}:focus & {
    top: calc(50%);
    transform: translate(-50%, -50%) scale(1.8) rotate(4deg);
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.white};
    padding: 5px;
  }
`

const Dialog = styled.dialog.attrs({
  open: props => props.open
})`
  display: block;
  opacity: ${props => (props.open ? 1 : 0)};
  pointer-events: ${props => (props.open ? 'initial' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  z-index: ${props => props.theme.zIndexes.dialog};
  transition: 0.4s;
  cursor: default;
  ::backdrop {
    display: none;
  }
`

const DialogBackdrop = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: ${props => props.theme.zIndexes.dialog};
`

const CloseBtn = styled.button.attrs({
  tabIndex: props => (props.tabbable ? 0 : -1)
})`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`

const Description = styled.p`
  white-space: pre-wrap;
  line-height: 1.5em;
  text-align: left;
  cursor: text;
`
