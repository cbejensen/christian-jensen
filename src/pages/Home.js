import React from 'react'
import styled from 'styled-components'
import PortfolioCategories from '../containers/PortfolioCategories.js'
import CategoryGallery from '../components/CategoryGallery'
import TriangleCurve from '../components/TriangleCurve'
import { H1 } from '../styled-components/Headings.js'

export default class Home extends React.Component {
  render() {
    const zIndexes = {
      trianglesRight: -1,
      headerStick: -1
    }
    // TODO: figure out what to do with the hideous header
    return (
      <React.Fragment>
        <TriangleCurve
          triangleSize={40}
          triangleColor="gray"
          width="50%"
          height="500px"
          float="left"
        />
        <TriangleCurve
          triangleSize={40}
          triangleColor="gray"
          width="50%"
          height="500px"
          positionRight
          containerStyles={{ zIndex: zIndexes.trianglesRight }}
        />
        <Header>
          <HeaderStick>Christian</HeaderStick>
          <HeaderStick zIndex={zIndexes.headerStick}>Jensen</HeaderStick>
        </Header>
        {/* <H1 style={{ background: 'black', color: '#fff' }}>Christian Jensen</H1> */}
        <main style={{ maxWidth: 800, padding: '0 15px', margin: 'auto' }}>
          <Mug src="/me.jpg" alt="Christian Jensen" />
          <Intro>
            Hello! My name is Christian, and I am a front-end web developer. In
            2015, I attended <a href="https://devmountain.com/">DevMountain</a>{' '}
            - a 3-month coding bootcamp. After graduating, I was invited to sit
            in on another 3-month cohort, which is when I was introduced to{' '}
            <a href="https://reactjs.org/">React</a>. Since then, I have
            primarily been coding in React for my personal projects, which you
            can see below. Currently, I am a web developer at{' '}
            <a href="https://www.180fusion.com/">180Fusion</a>, helping small
            businesses with SEO and site performance.
          </Intro>
          <PortfolioCategories>
            {cats => (
              <React.Fragment>
                {cats.map((cat, i) => (
                  <CategoryGallery
                    title={cat.category}
                    items={cat.items}
                    key={i}
                  />
                ))}
              </React.Fragment>
            )}
          </PortfolioCategories>
        </main>
      </React.Fragment>
    )
  }
}

const Header = styled(H1)`
  margin: 0;
  line-height: 1.1;
`

const HeaderStick = styled.div`
  width: 200vw;
  position: relative;
  left: -50%;
  margin-top: 10px;
  color: ${props => props.theme.white};
  padding: 5px;
  background: ${props => props.theme.primaryColor};
  text-align: center;
  z-index: ${props => props.zIndex};
  :first-child {
    transform: rotate(-3deg);
  }
  :nth-child(2) {
    transform: rotate(3deg);
  }
`

const Mug = styled.img.attrs({
  src: '/me.jpg',
  alt: 'Christian Jensen'
})`
  float: right;
  width: 100px;
  border-radius: 100%;
  margin-left: 15px;
  @supports (shape-outside: circle(60px)) {
    shape-outside: circle(60px);
  }
`

const Intro = styled.p`
  padding-top: 15px;
  font-size: 20px;
  line-height: 1.5em;
  max-width: 1000px;
  margin: 0;
  @media (min-width: ${props => props.theme.media.small}) {
    text-align: justify;
  }
  /* position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw; */
`
