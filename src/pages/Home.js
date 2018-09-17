import React from 'react'
import styled from 'styled-components'
import CornerCurveScatter from '../containers/CornerCurveScatter.js'
import RandomRotations from '../containers/RandomRotations.js'

const curveItemSize = 40

export default () => {
  return (
    <main>
      <CornerCurveScatter
        width="100%"
        height="700px"
        float="left"
        itemSize={curveItemSize}
        randomlyRotate
      >
        {items => (
          <RandomRotations itemsToRotate={items} rotationInterval={300}>
            {rotations => (
              <React.Fragment>
                {items.map((item, i) => (
                  <SVG item={item} key={i}>
                    <Triangle rotation={rotations[i]} />
                  </SVG>
                ))}
              </React.Fragment>
            )}
          </RandomRotations>
        )}
      </CornerCurveScatter>
      <H1>Hello World</H1>
      <Intro>
        My name is Christian Jensen, and I am a web developer. I started
        learning the basics from{' '}
        <a href="https://www.codecademy.com/">CodeCademy</a>, and after
        realizing my love for coding, decided to attend{' '}
        <a href="https://devmountain.com/">DevMountain</a> - a 3-month bootcamp
        for front-end web development - in 2015. After graduating, I was invited
        to sit in on another 3-month cohort to learn additional material, which
        is when I was introduced to <a href="https://reactjs.org/">React</a>.
        Since then, I have primarily been coding in React for my personal
        projects, which you can see below. Currently, I am a web developer at{' '}
        <a href="https://www.180fusion.com/">180Fusion</a>, helping small
        businesses with{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Glossary/SEO">SEO</a>{' '}
        and{' '}
        <a href="https://developers.google.com/web/tools/lighthouse/">
          site performance
        </a>
        .
      </Intro>
    </main>
  )
}

const H1 = styled.h1`
  font-size: 3rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-top: 0;
  background: tomato;
  padding: 30px;
`

const Intro = styled.p`
  padding: 0 15px;
  text-align: justify;
  font-size: 20px;
  line-height: 1.5em;
  max-width: 1000px;
  margin: 0 auto;
`

const SVG = styled.svg.attrs({
  viewBox: '0 0 100 100'
})`
  position: absolute;
  overflow: visible;
  ${({ item }) => `
    left: calc(${item.x}% - ${item.size}px);
    top: calc(${item.y}% - ${item.size}px);
    width: ${curveItemSize}px;
    height: ${curveItemSize}px;
  `};
`

const Triangle = styled.polygon.attrs({
  points: '50 0 100 100 0 100',
  stroke: '#333',
  fill: 'transparent',
  vectorEffect: 'non-scaling-stroke',
  transform: props => `rotate(${props.rotation || 0} 50 50)`
})`
  transition: 0.5s;
  mix-blend-mode: difference;
`
