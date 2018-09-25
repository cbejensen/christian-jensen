import React from 'react'
import styled from 'styled-components'
import PortfolioCategories from '../containers/PortfolioCategories.js'
import CategoryGallery from '../components/CategoryGallery'
import TriangleCurve from '../components/TriangleCurve'
import { H1 } from '../styled-components/Headings.js'

export default class Home extends React.Component {
  render() {
    // TODO: figure out what to do with the hideous header
    return (
      <React.Fragment>
        {/* <header>
          <TopBar>Christian Jensen</TopBar>
        </header> */}
        <TriangleCurve
          triangleSize={40}
          width="50%"
          height="400px"
          float="left"
        />
        <main style={{ maxWidth: 800, padding: '0 15px', margin: 'auto' }}>
          <Intro>
            <Mug src="/me.jpg" alt="Christian Jensen" />
            My name is Christian Jensen, and I am a front-end web developer. In
            2015, I attended <a href="https://devmountain.com/">
              DevMountain
            </a>{' '}
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

const TopBar = styled.div`
  position: relative;
  background: ${props => props.theme.black};
  background: linear-gradient(to right, #333, blue);
  text-transform: uppercase;
  font-size: 2em;
  color: ${props => props.theme.white};
  mix-blend-mode: difference;
`

const Intro = styled.p`
  padding-top: 15px;
  text-align: justify;
  font-size: 20px;
  line-height: 1.5em;
  max-width: 1000px;
  margin: 0;
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
