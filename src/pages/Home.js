import React from 'react'
import styled from 'styled-components'
import PortfolioCategories from '../containers/PortfolioCategories.js'
import CategoryGallery from '../components/CategoryGallery'
import TriangleCurve from '../components/TriangleCurve'
import { H1 } from '../styled-components/Headings.js'

export default class Home extends React.Component {
  render() {
    const headerHeight = '200px'
    const zIndexes = {
      mug: 1
    }
    // TODO: figure out what to do with the hideous header
    return (
      <React.Fragment>
        <TriangleCurve
          triangleSize={40}
          triangleColor="gray"
          width="50%"
          height="100vh"
          float="left"
        />
        <TriangleCurve
          triangleSize={40}
          triangleColor="gray"
          width="50%"
          height="500px"
          positionRight
        />
        <Header height={headerHeight}>
          <HeaderStick>Christian</HeaderStick>
          <HeaderStick>Jensen</HeaderStick>
        </Header>
        {/* <H1 style={{ background: 'black', color: '#fff' }}>Christian Jensen</H1> */}
        <Main>
          <Mug
            style={{
              zIndex: zIndexes.mug
            }}
          />
          <Section>
            <Intro>
              Hello! My name is Christian, and I am a front-end web developer.
              In 2015, I attended{' '}
              <a href="https://devmountain.com/">DevMountain</a> - a 3-month
              coding bootcamp. After graduating, I was invited to sit in on
              another 3-month cohort, which is when I was introduced to{' '}
              <a href="https://reactjs.org/">React</a>. Since then, I have
              primarily been coding in React for my personal projects, which you
              can see below. Currently, I am a web developer at{' '}
              <a href="https://www.180fusion.com/">180Fusion</a>, helping small
              businesses with SEO and site performance.
            </Intro>
          </Section>
          <PortfolioCategories>
            {cats => (
              <React.Fragment>
                {cats.map((cat, i) => (
                  <Section key={i}>
                    <CategoryGallery title={cat.category} items={cat.items} />
                  </Section>
                ))}
              </React.Fragment>
            )}
          </PortfolioCategories>
        </Main>
      </React.Fragment>
    )
  }
}

const Header = styled(H1)`
  position: absolute;
  top: 0;
  height: ${props => props.height};
  width: 100%;
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
`

const HeaderStick = styled.div`
  width: 200vw;
  position: absolute;
  left: -50%;
  margin-top: 10px;
  color: ${props => props.theme.white};
  padding: 5px;
  background: linear-gradient(
    to right,
    white,
    ${props => props.theme.primaryColor} 50%
  );
  text-align: center;
  z-index: ${props => props.zIndex};
  :first-child {
    top: 0.5em;
    transform: rotate(-3deg);
  }
  :nth-child(2) {
    bottom: 0.5em;
    transform: rotate(6deg);
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
  margin: 0 0 5px 15px;
  shape-outside: circle(60px);
`

const Main = styled.main`
  max-width: ${props => props.theme.maxContentWidth};
  padding: 200px 15px 0;
  margin: auto;
`

const Section = styled.section`
  max-width: ${props => (props.contained ? '800px' : 'initial')};
`

const Intro = styled.p`
  margin-top: ${props => props.paddingTop};
  font-size: 20px;
  line-height: 1.5em;
  max-width: 1000px;
  // margin: 0;
  z-index: 1;
  @media (min-width: ${props => props.theme.media.small}) {
    text-align: justify;
  }
  /* position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw; */
`
