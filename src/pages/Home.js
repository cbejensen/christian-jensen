import React from 'react'
import PortfolioCategories from '../containers/PortfolioCategories.js'
import CategoryGallery from '../components/CategoryGallery'
import Header from '../components/Header'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import CategoryHeader from '../components/CategoryGallery/CategoryHeader'

export default class Home extends React.Component {
  render() {
    const headerHeight = '200px'
    const zIndexes = {
      mug: 1,
      headerStickLower: 1
    }
    return (
      <ThemeProvider theme={{ zIndexes }}>
        <React.Fragment>
          <Header height={headerHeight} />
          <Main>
            <section className="contained">
              <Mug
                style={{
                  zIndex: zIndexes.mug
                }}
              />
              <Intro>
                Hello! My name is Christian, and I am a front-end web developer.
                In 2015, I attended{' '}
                <a href="https://devmountain.com/">DevMountain</a>, a 3-month
                coding bootcamp. After graduating, I was invited to sit in on
                another 3-month cohort, which is when I was introduced to{' '}
                <a href="https://reactjs.org/">React</a>. Since then, I have
                primarily been coding in React for my personal projects, which
                you can see below. Currently, I am a web developer at{' '}
                <a href="https://www.180fusion.com/">180Fusion</a>, helping
                small businesses with SEO and site performance.
              </Intro>
            </section>
            <PortfolioCategories>
              {cats =>
                cats.map((cat, i) => (
                  <section key={i}>
                    <CategoryGallery
                      title={cat.category}
                      items={cat.items}
                      headerStyle={{ margin: '60px auto 0' }}
                    />
                  </section>
                ))
              }
            </PortfolioCategories>
          </Main>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

const clunkyTurn = keyframes`
  10% {
    transform: rotate(-10deg) scale(1.1);
  }
  50% {
    transform: rotate(180deg) scale(0.8);
  }
  90% {
    transform: rotate(370deg) scale(1.1);
  }
`

const Mug = styled.img.attrs({
  src: '/me.jpg',
  alt: 'Christian Jensen'
})`
  position: relative;
  float: right;
  width: 100px;
  border-radius: 100%;
  margin: -20px -5px 5px 15px;
  box-shadow: -4px 4px 15px #000;
  shape-outside: circle(55px);
  transition: 0.4s;
  :hover {
    transform: rotate(-6deg) scale(1.1);
  }
  @media (min-width: ${props => props.theme.media.medium}) {
    width: 200px;
    shape-outside: circle(110px);
  }
`

const Main = styled.main`
  /* max-width: ${props => props.theme.maxContentWidth}; */
  padding: 200px 15px 0;
  margin: auto;
`

const Intro = styled.p`
  margin-top: ${props => props.paddingTop};
  font-size: 1.4rem;
  line-height: 1.5em;
  max-width: 1000px;
  background: #dce5e7;
  padding: 20px 30px;
  border-radius: 15px;
  mix-blend-mode: lighten;
  z-index: 1;
  @media (min-width: ${props => props.theme.media.small}) {
    text-align: justify;
  }
`
