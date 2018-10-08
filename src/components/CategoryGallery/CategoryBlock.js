import React from 'react'
import styled from 'styled-components'
import { H3 } from '../styled/Headings'
import TriangleCurve from '../TriangleCurve'

export default class CategoryBlock extends React.Component {
  state = {
    showDialog: false
  }
  setDialogRef = elem => {
    this.dialogRef = elem
    // we want to know when user clicks outside dialog box
    // so we can close the dialog box, so we need to add
    // a custom event listener instead of using
    // React's event dispatcher, otherwise every click will always
    // trigger a body or html element event listener, whether
    // inside or outside actual dialog box
    this.dialogListener = this.dialogRef.addEventListener('click', e => {
      // if the close button was not clicked, stop propagation
      // so no clicks are registered on the html element
      if (e.target.tagName !== 'BUTTON') e.stopPropagation()
    })
  }
  setCloseBtnRef = elem => {
    // used to set focus on close button when dialog is opened
    this.closeBtnRef = elem
  }
  showDialog = () => {
    // if browser supports dialog element, just use that
    if (this.dialogRef.showModal) {
      this.dialogSupported = true
      this.dialogRef.showModal()
    }
    // close dialog box when clicking elsewhere
    // this.htmlListener = document.documentElement.addEventListener(
    //   'click',
    //   this.closeDialog,
    //   {
    //     once: true
    //   }
    // )
    this.setState({ showDialog: true })
    this.closeBtnRef.focus()
  }
  closeDialog = e => {
    console.log('closed')
    if (this.dialogRef.close) this.dialogRef.close()
    this.setState({ showDialog: false })
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.dialogListener)
    // just in case the options object of addEventListener isn't supported
    if (this.htmlListener)
      window.removeEventListener('click', this.htmlListener)
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
        <DialogBackdrop
          show={this.state.showDialog}
          onClick={() => console.log('got it friend')}
        />
        <Dialog
          innerRef={this.setDialogRef}
          open={this.dialogSupported ? false : this.state.showDialog}
        >
          <CloseBtn
            innerRef={this.setCloseBtnRef}
            onClickCapture={this.closeDialog}
          >
            &times;
          </CloseBtn>
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
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  z-index: ${props => props.theme.zIndexes.dialog};
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

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  /* :hover,
  :focus {
    color: ${props => props.theme.primaryColor};
    border: none;
  }
  :-moz-focusring {
    outline: auto;
    border: none;
  } */
`

const Description = styled.p`
  white-space: pre-wrap;
  line-height: 1.5em;
  text-align: left;
  cursor: text;
`
