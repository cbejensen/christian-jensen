import React from 'react'
import { getRandomInt } from '../utils.js'

class Triangle extends React.Component {
  static defaultProps = {
    rotation: getRandomInt(0, 359),
    x: 0,
    y: 0,
    width: '100px'
  }
  state = {
    rotation: this.props.rotation,
    x: this.props.x,
    y: this.props.y
  }
  render() {
    // height of equilateral triangle is
    // half of width * sq root of 3
    // `${Math.floor((parseInt(this.props.width) / 2) * 1.73)}px`
    const styles = {
      svg: {
        position: 'absolute',
        // subtract width of triangle to prevent overflow
        left: `calc(${this.state.x}% - ${this.props.width})`,
        top: `calc(${this.state.y}% - ${this.props.width})`,
        overflow: 'visible',
        transition: '5s',
        width: this.props.width,
        height: this.props.width
      }
    }
    return (
      <svg viewBox="0 0 100 100" style={styles.svg}>
        <polygon
          points="50 0 100 100 0 100"
          stroke={this.props.stroke || '#333'}
          fill="transparent"
          vectorEffect="non-scaling-stroke"
          transform={`rotate(${this.state.rotation || 0} 50 50)`}
          style={this.props.style}
        />
      </svg>
    )
  }
}

export default Triangle
