import React from 'react'
import { getRandomInt } from '../utils'

class CurveShapes extends React.Component {
  state = {
    shapePositions: []
  }
  componentDidMount() {
    const shapePositions = this.props.borderPoints.map(point => {
      return {
        x: point.x,
        y: getRandomInt(0, point.y),
        rotation: getRandomInt(0, 359)
      }
    })
    this.setState({ shapePositions })
    this.interval = setInterval(this.randomlyRotate, this.props.interval)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  randomlyRotate = () => {
    this.setState(state => {
      const newState = { ...state }
      const index = getRandomInt(0, state.shapePositions.length - 1)
      const rotation = newState.shapePositions[index].rotation
      // debugger
      // add 45 degrees to rotation, unless it's within 45 of 359,
      // in which case we basically start over from 0
      newState.shapePositions[index].rotation =
        rotation <= 314 ? rotation + 45 : Math.abs(rotation - 359)
      return newState
    })
  }
  render() {
    return React.Children.only(this.props.children(this.state.shapePositions))
  }
}

export default CurveShapes
