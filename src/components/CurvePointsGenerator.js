import React from 'react';
import {getRandomInt, getExponentialInt} from '../utils.js';

export default function CurvePointsGenerator(props) {
  const points = [];
  // Returns array of random x y coordinates that are
  // constrained within a curve.
  // Imagine a graph with 0,0 at bottom left.
  // We want a curve from top left to bottom right
  // that gets less steep as it moves right.
  for (var i = 0; i < props.num; i++) {
    // First, we need a random num for x.
    // To space out the points better,
    // we want more points along one side
    // of the the x axis, so we use an
    // exponential func
    const x = getExponentialInt(getRandomInt(0, 100), 100);
    // The higher x is, the higher y can be,
    // so we need a random number for y that is
    // less than an exponentially increasing maximum.
    // We subtract from 100 to flip the curve from
    // convex to concave
    const yMax = 100 - getExponentialInt(x, 100);
    // Now that we have a limit for y
    // we can get a random number for y
    const y = getRandomInt(0, yMax);
    // TODO: prevent overlap of triangles
    const point = {
      // We subtract x from 100 to flip the curve
      // horiztonally, so our curve goes
      // from top left to bottom right.
      x: 100 - x,
      y: y
    }
    points.push(point);
  }
  return props.render(points);
}