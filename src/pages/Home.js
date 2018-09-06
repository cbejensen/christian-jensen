import React from 'react'
import CurvePoints from '../components/CurvePoints'
import DiagonalFloats from '../components/DiagonalFloats'
import Triangle from '../containers/Triangle'
import { getRandomInt } from '../utils.js'
import styled from 'styled-components'

export default () => {
  const curveHeight = '100vh'
  const curveWidth = '80%'
  const shapeOutsideSupported = CSS.supports(
    'shape-outside',
    'polygon(0% 0%, 100% 0%, 0% 100%)'
  )
  const createTriangles = points => {
    // width of each triangle
    const width = '50px'
    return points.map((point, i) => {
      const coords = {
        x: point.x,
        y: getRandomInt(0, point.y)
      }
      const rotation = getRandomInt(0, 359)
      return (
        <Triangle
          {...coords}
          width={width}
          key={i}
          rotation={rotation}
          style={{ mixBlendMode: 'difference' }}
        />
      )
    })
  }
  return (
    <main>
      <CurvePoints>
        {points => (
          <React.Fragment>
            <Curve
              shapeOutsideSupported={shapeOutsideSupported}
              width={curveWidth}
              height={curveHeight}
              coords={points}
            >
              {createTriangles(points)}
            </Curve>
            {shapeOutsideSupported ? null : (
              <DiagonalFloats width={curveWidth} height={curveHeight} />
            )}
          </React.Fragment>
        )}
      </CurvePoints>
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

const getCurve = coords => {
  const shape = coords.reduce(
    (acc, cur) => acc + `${cur.x}% ${cur.y}%, `,
    'polygon(0% 0%, '
  )
  // remove trailing comma
  return shape.slice(0, -2) + ')'
}

const Curve = styled.div`
  float: left;
  pointer-events: none;
  position: ${props => (props.shapeOutsideSupported ? 'relative' : 'absolute')};
  height: ${props => props.height};
  width: ${props => props.width};
  ${props =>
    props.shapeOutsideSupported && `shape-outside: ${getCurve(props.coords)}`};
`

const H1 = styled.h1`
  font-size: 3rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 0;
  background: tomato;
  padding: 30px;
`

const Intro = styled.p`
  padding: 100px;
  text-align: justify;
  font-size: 20px;
  line-height: 1.5em;
  background: white;
  max-width: 1000px;
  margin: 0 auto;
`
