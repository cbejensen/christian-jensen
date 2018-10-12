import React from 'react'
import styled, { css } from 'styled-components'
import { H3 } from '../styled/Headings'
import TriangleCurve from '../TriangleCurve'
import { Image, Video } from 'cloudinary-react'

// TODO: move dialog to parent
export default class CategoryBlock extends React.Component {
  state = {
    expanded: false
  }
  componentDidMount() {}
  setCloseBtnRef = elem => {
    // used to set focus on close button when expanded
    this.closeBtnRef = elem
  }
  expand = () => {
    this.setState({ expanded: true })
    // this.closeBtnRef.focus()
  }
  closeDialog = e => {
    this.setState({ expanded: false })
  }
  focus = () => {
    this.closeBtnRef.focus()
  }
  catchEnterKey = e => {
    if (e.keyCode === 13) {
      this.expand()
    }
    console.log(e, e.target, e.keyCode)
  }
  render() {
    const transitionSpeed = '0.4s'
    return (
      <Block
        expanded={this.state.expanded}
        onClick={this.expand}
        tabIndex="0"
        onKeyDown={this.catchEnterKey}
      >
        {this.props.video ? (
          <StyledVideo
            publicId={this.props.video}
            resourceType="video"
            transitionSpeed={transitionSpeed}
          />
        ) : (
          <StyledImage
            publicId={this.props.img}
            alt={this.props.alt}
            transitionSpeed={transitionSpeed}
          />
        )}
        <Title transitionSpeed={transitionSpeed}>{this.props.title}</Title>
        {/* <DialogBackdrop show={this.state.showDialog} onClick={this.focus} />
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
            triangleColor="rgba(0,0,0,0.2)"
            width="100%"
            height="200px"
            corner="bottom right"
          />
        </Dialog> */}
      </Block>
    )
  }
}

const normalBlock = css`
  padding: 30px;
  padding-bottom: 2em;
  margin: 10px;
  min-width: 300px;
  max-width: 600px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
  .user-is-tabbing &:focus {
    outline: 5px auto ${props => props.theme.secondaryColor};
  }
  @media (min-width: ${props => props.theme.media.medium}) {
    flex: 1;
  }
`

const expandedBlock = css`
  position: fixed;
`

const Block = styled.div`
  ${props => (props.expanded ? expandedBlock : normalBlock)};
  font-size: 30px;
`

const media = css`
  width: 100%;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  transition: ${props => props.transitionSpeed};
  ${Block}:hover &,
  ${Block}:focus & {
    transform: scale(1.1);
    box-shadow: 8px 8px 30px #000;
    outline: none;
  }
`

// for StyledImage and StyledVideo, we need to pass some
// props to cloudinary's Image and Video components, but
// we don't want to pass transitionSpeed since cloudinary
// will just pass it on to the DOM as an invalid attribute.
// Thus, we extract that prop and pass the rest
const StyledImage = styled(({ transitionSpeed, ...rest }) => (
  <Image {...rest} />
))`
  ${media};
`

const StyledVideo = styled(({ transitionSpeed, ...rest }) => (
  <Video {...rest} />
)).attrs({
  autoPlay: true,
  loop: true
})`
  ${media};
`

const Title = styled.h3`
  position: absolute;
  top: calc(100% - 1.5em);
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-weight: bold;
  font-size: 1em;
  transition: ${props => props.transitionSpeed};
  ${Block}:hover &,
  ${Block}:focus & {
    top: calc(50% - 0.5em);
    transform: translate(-50%, -50%) scale(1.8) rotate(4deg);
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.white};
    padding: 4px 20px;
  }
`

const Dialog = styled.dialog.attrs({
  open: props => props.open
})`
  display: block;
  opacity: ${props => (props.open ? 1 : 0)};
  background: ${props => props.theme.white};
  padding: 15px;
  pointer-events: ${props => (props.open ? 'initial' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  border: none;
  border-radius: 10px;
  max-width: ${props => props.theme.maxContentWidth};
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
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: ${props => props.theme.zIndexes.dialog};
  transition: 0.4s;
`

const CloseBtn = styled.button.attrs({
  tabIndex: props => (props.tabbable ? 0 : -1)
})`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 5px;
  right: 10px;
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
