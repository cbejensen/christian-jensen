import React from 'react'
import styled from 'styled-components'
import CornerCurve from '../containers/CornerCurve.js'

export default () => {
  return (
    <main>
      <CornerCurve
        width="80%"
        height="100vh"
        float="left"
        itemSize={40}
        preventOverlap
        randomlyRotate
      >
        {item => {
          console.log(item)

          const style = {
            position: 'absolute',
            // subtract itemSize to avoid overflow
            left: `calc(${item.x}% - ${item.size}px)`,
            top: `calc(${item.y}% - ${item.size}px)`,
            width: item.size,
            height: item.size,
            overflow: 'visible'
          }
          return (
            <svg style={style} viewBox="0 0 100 100">
              <polygon
                points="50 0 100 100 0 100"
                stroke="#333"
                fill="transparent"
                vectorEffect="non-scaling-stroke"
                transform={`rotate(${item.rotation || 0} 50 50)`}
                style={{ transition: '.5s' }}
              />
            </svg>
          )
        }}
      </CornerCurve>
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
  padding: 0 100px;
  text-align: justify;
  font-size: 20px;
  line-height: 1.5em;
  background: white;
  max-width: 1000px;
  margin: 0 auto;
`
