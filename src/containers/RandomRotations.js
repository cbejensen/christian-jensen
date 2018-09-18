import React from 'react'
import { getRandomInt } from '../utils'

class RandomRotations extends React.Component {
  state = {
    rotations: []
  }
  componentDidMount() {
    this.init()
    this.rotationInterval = this.props.rotationInterval
      ? setInterval(this.randomlyRotate, this.props.rotationInterval)
      : null
  }
  componentDidUpdate(prevProps) {
    // TODO: only generate new rotations if new items Array is longer,
    // and only for the new items. If new items array is shorter, simply
    // remove some items from state.rotations to make lengths equal
    if (this.props.itemsToRotate.length !== prevProps.itemsToRotate.length) {
      this.init()
    }
  }
  init = () => {
    const rotations = this.props.itemsToRotate.map(() => getRandomInt(0, 359))
    this.setState({
      rotations
    })
  }
  randomlyRotate = () => {
    this.setState(state => {
      const newState = { ...state }
      const randomIndex = getRandomInt(0, state.rotations.length - 1)
      const rotation = newState.rotations[randomIndex]
      // add 45 degrees to rotation, unless it's within 45 of 359,
      // in which case we basically start over from 0
      newState.rotations[randomIndex] =
        rotation <= 314 ? rotation + 45 : Math.abs(rotation - 359)
      return newState
    })
  }
  componentWillUnmount() {
    if (this.rotationInterval) clearInterval(this.rotationInterval)
  }
  render() {
    return React.Children.only(this.props.children(this.state.rotations))
  }
}

export default RandomRotations
