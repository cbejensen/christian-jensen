import React from 'react'
import { getExponentialInt } from '../utils.js'

// TODO: prevent overlap of shapes

export default function CurvePoints(props) {
  const points = []
  // Returns array of x y coordinates that form a curve.
  // Imagine a graph with 0,0 at bottom left,
  // assuming a max of 100 on x and y axes
  // We want a concave curve from top left to bottom right
  for (var i = 0; i <= 100; i++) {
    // The higher x is, the higher y can be.
    // We subtract from 100 to flip the curve from
    // convex to concave.
    const y = 100 - getExponentialInt(i, 100)
    const point = {
      // We subtract x from 100 to flip the curve
      // horiztonally, so our curve goes
      // from top left to bottom right.
      x: 100 - i,
      y
    }
    points.push(point)
  }
  return React.Children.only(props.children(points))
}
