import React from 'react';
import {getRandomInt} from '../utils.js';

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
    const height = Math.floor(this.props.width * 0.75);
    const styles = {
      svg: {
        position: 'absolute',
        left: `${this.state.x}%`,
        top: `${this.state.y}%`,
        overflow: 'visible',
        transition: '5s',
        width: this.props.width,
        height: `calc(${this.props.width} * 0.75)`
      }
    }
    return (
      <svg viewBox="0 0 100 100" style={styles.svg}>
        <polygon points="50 0 100 100 0 100" stroke={this.props.stroke || "#333"} fill="transparent" vectorEffect="non-scaling-stroke" transform={`rotate(${this.state.rotation || 0} 50 50)`} />
      </svg>
    )
  }
}

export default Triangle;