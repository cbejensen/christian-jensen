import React from 'react'
import PortfolioCategories from '../containers/PortfolioCategories.js'
import CategoryGallery from '../components/CategoryGallery'
import { Head } from 'react-static'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled, { ThemeProvider, keyframes } from 'styled-components'
import { createZIndexes } from '../utils'

export default class Home extends React.Component {
  render() {
    const zIndexes = createZIndexes([
      'modal',
      'modalBackground',
      'mug',
      'headerStickLower',
      'intro'
    ])
    return (
      <ThemeProvider theme={{ zIndexes }}>
        <React.Fragment>
          <Head>
            <title>Christian Jensen | Portfolio</title>
            <meta
              name="description"
              content="My name is Christian Jensen and I am a front-end web developer. I graduated from DevMountain and specialize in React. I love building useful and original web apps with modern technologies and am open to new opportunities. Feel free to contact me any time!"
            />
          </Head>
          <Header />
          <Main>
            <section className="contained">
              <Mug
                style={{
                  zIndex: zIndexes.mug
                }}
              />
              <Intro>
                Hello! My name is Christian and I am a front-end web developer.
                In 2015 I attended{' '}
                <a href="https://devmountain.com/">DevMountain</a>, a 3-month
                coding bootcamp. From there I continued to hone my skills
                through side projects and any opportunity I could find at work,
                until landing my first programming job in 2017 at{' '}
                <a href="https://www.deluxe.com/">Deluxe</a> as their sole web
                developer. I'm a big fan of JavaScript, and my specialty is{' '}
                <a href="https://reactjs.org/">React</a>. If you have any
                questions, please feel free to contact me at{' '}
                <a href="tel:+1-801-633-8055">801-633-8055</a> or{' '}
                <a href="mailto:cbejensen@gmail.com">cbejensen@gmail.com</a>.
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
          <Footer />
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

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
  padding: 0 15px;
  margin: 180px auto 60px;
`

const Intro = styled.p`
  line-height: 1.5em;
  max-width: 1000px;
  margin-top: 0;
  background: ${props => props.theme.white};
  border: 10px solid;
  border-image: linear-gradient(
      to bottom right,
      ${props => props.theme.secondaryColor},
      #15c785
    )
    27;
  border-radius: 15px;
  font-weight: 400;
  padding: 20px 30px;
  position: relative;
  z-index: 1;
  @media (min-width: ${props => props.theme.media.small}) {
    text-align: justify;
    font-size: 1.3rem;
  }
`
