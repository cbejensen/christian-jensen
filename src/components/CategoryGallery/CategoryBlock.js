import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { H3 } from '../styled/Headings'
import TriangleCurve from '../TriangleCurve'
import { Image, Video } from 'cloudinary-react'

export default class CategoryBlock extends React.Component {
  state = {
    expanded: false
  }
  setBackBtnRef = elem => {
    // used to set focus on close button when expanded
    this.backBtnRef = elem
  }
  expand = () => {
    // TODO: figure out how to focus shrink btn right away
    this.setState({ expanded: true })
  }
  shrink = e => {
    if (e) e.stopPropagation()
    // TODO: figure out why Firefox keeps focus after shrinking
    this.setState(state => ({ expanded: false }))
  }
  focusBackBtn = () => {
    if (this.backBtnRef.offsetHeight) {
      this.backBtnRef.focus()
    }
  }
  catchEnterKey = e => {
    if (e.keyCode === 13) {
      this.expand()
    }
  }
  catchEscapeKey = e => {
    if (e.keyCode === 27) {
      this.shrink()
    }
  }
  render() {
    console.log('render', this.focusBackBtn)
    return (
      <React.Fragment>
        <ExpandBackground show={this.state.expanded} onClick={this.shrink} />
        <Block
          expanded={this.state.expanded}
          onClick={this.state.expanded ? null : this.expand}
          tabIndex="0"
          onKeyDown={
            this.state.expanded ? this.catchEscapeKey : this.catchEnterKey
          }
        >
          {this.props.video ? (
            <StyledVideo
              publicId={this.props.video}
              resourceType="video"
              transitionSpeed=".4s"
              expanded={this.state.expanded}
              tabIndex="-1"
            />
          ) : (
            <StyledImage
              publicId={this.props.img}
              alt={this.props.alt}
              transitionSpeed=".4s"
              expanded={this.state.expanded}
              tabIndex="-1"
            />
          )}
          <Title expanded={this.state.expanded} transitionSpeed=".6s">
            {this.props.title}
          </Title>
          <Description expanded={this.state.expanded} transitionSpeed=".4s">
            {this.props.description}
          </Description>
          <ExpandedButtons expanded={this.state.expanded} transitionSpeed=".4s">
            <button ref={this.setBackBtnRef} onClickCapture={this.shrink}>
              Back
              <div>&larr;</div>
            </button>
            {this.props.link && (
              <a href={this.props.link} target="_blank" rel="external">
                Visit
                <div style={{ transform: 'rotate(-45deg)' }}>&rarr;</div>
              </a>
            )}
          </ExpandedButtons>
        </Block>
      </React.Fragment>
    )
  }
}

const ExpandBackground = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: ${props => props.theme.zIndexes.modalBackground};
`

const blockNormal = css`
  position: relative;
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

const blockExpanded = css`
  position: fixed;
  top: 50%;
  right: 0;
  left: 0;
  padding: 1em 30px 0;
  max-height: 100vh;
  max-width: 100vw;
  overflow: scroll;
  transform: translateY(-50%);
  background: ${props => props.theme.darkGray};
  z-index: ${props => props.theme.zIndexes.modal};
`

const Block = styled.div`
  ${props => (props.expanded ? blockExpanded : blockNormal)};
  font-size: 30px;
`

const mediaCommon = css`
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  transition: ${props => props.transitionSpeed};
`

const mediaNormal = css`
  width: 100%;
  ${Block}:hover &,
  ${Block}:focus & {
    transform: scale(1.1);
    box-shadow: 8px 8px 30px #000;
    outline: none;
  }
`

const mediaExpanded = css`
  position: relative;
  max-width: 50%;
  float: right;
  margin: 0 0 0.5rem 0.5rem;
  z-index: 1;
  /* TODO: figure out why this media query doesn't work
  (default width would change to 100%) */
  @media (min-width: {props => props.theme.media.small}) {
    max-width: 50%;
    float: right;
    margin: 0 0 0.5rem 0.5rem;
    z-index: 1;
  }
`

// for StyledImage and StyledVideo, we need to pass some
// props to cloudinary's Image and Video components, but
// we don't want to pass all, so we extract and pass the rest
const StyledImage = styled(({ transitionSpeed, expanded, ...rest }) => (
  <Image {...rest} />
))`
  ${props => (props.expanded ? mediaExpanded : mediaNormal)};
  ${mediaCommon};
`

const StyledVideo = styled(({ transitionSpeed, expanded, ...rest }) => (
  <Video {...rest} />
)).attrs({
  autoPlay: true,
  loop: true
})`
  ${props => (props.expanded ? mediaExpanded : mediaNormal)};
  ${mediaCommon};
`

const growTitleLine = keyframes`
  to {
    width: calc(100vw + 60px);
  }
`

const titleNormal = css`
  position: absolute;
  top: calc(100% - 1.5em);
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
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

const titleExpanded = css`
  position: static;
  display: inline-block;
  color: ${props => props.theme.white};
  margin-top: 0;
  margin-bottom: 0.5em;
  transform: rotate(-2deg);
  transition: ${props => props.transitionSpeed};
  ::before {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5em;
    top: -0.25em;
    left: -60px;
    background: ${props => props.theme.primaryColor};
    z-index: -1;
    animation: ${growTitleLine} 0.5s 1s forwards;
  }
`

const Title = styled.h3`
  ${props => (props.expanded ? titleExpanded : titleNormal)};
  font-weight: bold;
  font-size: 1em;
`

const descriptionNormal = css`
  display: none;
`

const descriptionExpanded = css`
  display: block;
  margin-top: 3rem;
  // transition on expanded only - we don't want transition on close
  transition: ${props => props.transitionSpeed};
`

const Description = styled.p`
  ${props => (props.expanded ? descriptionExpanded : descriptionNormal)};
  font-size: 1.2rem;
  margin: 0;
  color: ${props => props.theme.white};
`

const ExpandedButtons = styled.div`
  display: ${props => (props.expanded ? 'flex' : 'none')};
  opacity: ${props => (props.expanded ? 1 : 0)};
  visibility: ${props => (props.expanded ? 'visible' : 'hidden')};
  transition: ${props => props.transitionSpeed};
  justify-content: space-evenly;
  text-align: center;
  margin: 1rem 0;
  & button,
  & a {
    background: none;
    border: none;
    color: ${props => props.theme.secondaryColor};
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.4s;
    :hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`
