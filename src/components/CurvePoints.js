import React from 'react'
import { getRandomInt, getExponentialInt } from '../utils.js'

export default function CurvePoints(props) {
  const points = []
  // picture a 100x100 graph - this will return
  // the x,y coords (points) along a slope
  // (or random points within that curve)
  // where slope goes from top left to bottom right
  for (var i = 0; i <= props.num; i++) {
    let x, y
    if (props.random) {
      // we want more shapes to the left side,
      // so we use getExponentialInt and subtract from 100 to
      // increase chances of low x
      x = 100 - getExponentialInt(getRandomInt(0, 100), 100)
      // subtract from 100 to flip the curve
      const yMax = 100 - getExponentialInt(100 - x, 100)
      y = getRandomInt(0, yMax)
    } else {
      // since we want to base this off a 100x100 scale,
      // we need to adjust each coordinate to fit if
      // the num provided was not 100
      x = i * (100 / props.num)
      // subtract from 100 to flip the curve
      // and subtract x from 100 to make this curve concave
      y = (100 - getExponentialInt(100 - x, 100)) * (100 / props.num)
    }
    points.push({ x, y })
  }
  return React.Children.only(props.children(points))
}
CurvePoints.defaultProps = {
  num: 100
}
