import React from 'react'
import { withSiteData } from 'react-static'
import CurvePointsGenerator from '../components/CurvePointsGenerator';
import DiagonalFloats from '../components/DiagonalFloats';
import Triangle from '../containers/Triangle';
import {getRandomInt} from '../utils.js';

export default withSiteData(() => {
  const topLeftCurveHeight = '1000px';
  const topLeftCurveWidth = '100%';
  const barHeight = '50px';
  const styles = {
    cornerCurveTopLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: topLeftCurveHeight,
      width: topLeftCurveWidth,
    },
    header: {
      pointerEvents: 'none'
    },
    bar: {
      position: 'fixed',
      height: barHeight,
      width: '100vw',
      background: '#333',
      top: 0,
    },
    barOverlap: {
      position: 'absolute',
      height: '50px',
      width: '100vw',
      overflow: 'hidden'
    },
    content: {
      paddingTop: barHeight,
      width: '100%'
    }
  }
  const createTriangles = points => points.map((point, i) => {
    const rotation = getRandomInt(0, 359);
    return <Triangle {...point} width="100px" key={i} rotation={rotation} />
  })
  return (
    <CurvePointsGenerator num={50} render={points => (
      <React.Fragment>
        <header style={styles.header}>
          <div style={styles.bar}></div>
          <div style={styles.cornerCurveTopLeft}>
            {createTriangles(points)}
          </div>
          {/*}<div style={styles.barOverlap}>
            {createOverlapTriangles(points)}
          </div>*/}
        </header>
        <main style={styles.content}>
          <DiagonalFloats totalWidth={topLeftCurveWidth} totalHeight={topLeftCurveHeight} precision="200" floatMargin="100px" horizontal />
          <h1>Hello World</h1>
          <p>My name is Christian Jensen, and I am a web developer. I started learning the basics from <a href="https://www.codecademy.com/">CodeCademy</a>, and after realizing my love for coding, decided to attent <a href="https://devmountain.com/">DevMountain</a> - a 3-month bootcamp for front-end web development - in 2015. After graduating, I was invited to sit in on another 3-month cohort to learn additional material, which is when I was introduced to <a href="https://reactjs.org/">React</a>. Since then, I have primarily been coding in React for my personal projects, which you can see below. Currently, I am a web developer at <a href="https://www.180fusion.com/">180Fusion</a>, helping small businesses with <a href="https://developer.mozilla.org/en-US/docs/Glossary/SEO">SEO</a> and <a href="https://developers.google.com/web/tools/lighthouse/">site performance</a>.</p>
        </main>
      </React.Fragment>
    )} />
  )
})