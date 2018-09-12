import React from 'react'
import { getExponentialInt } from '../utils.js'

export default function DiagonalFloats({
  precision,
  horizontal,
  width,
  height,
  floatMargin
}) {
  const floats = []
  // if we want floats horizontal, every float shares a common height
  // otherwise they share a common width
  const commonSize = horizontal ? 'height' : 'width'
  const differentSize = horizontal ? 'width' : 'height'
  const marginDirection = horizontal ? 'marginRight' : 'marginBottom'
  const styles = {
    float: {
      [commonSize]: `calc(${horizontal ? height : width} / ${precision})`,
      float: 'left',
      clear: horizontal ? 'both' : 'none'
    }
  }
  for (var i = precision; i > 0; i--) {
    // if i is 0, we avoid dividing 0 and just return 0
    // otherwise - get an exponential int,
    // then subtract from max to flip curve,
    // then divide by max to get a percentage
    let percentageOfLength =
      i === 0 ? 0 : (precision - getExponentialInt(i, precision)) / precision
    let floatLength = `calc(${
      horizontal ? width : height
    } * ${percentageOfLength})`
    const style = {
      ...styles.float,
      [differentSize]: floatLength,
      [marginDirection]: floatMargin
    }
    floats.push(<span style={style} key={i} />)
  }
  return <React.Fragment>{floats}</React.Fragment>
}
DiagonalFloats.defaultProps = {
  precision: 100,
  totalWidth: '100%',
  totalHeight: '100%',
  floatMargin: '0px',
  horizontal: false
}
