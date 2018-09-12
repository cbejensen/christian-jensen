import React from 'react'
import { getRandomInt } from '../utils'

// returns array of integers
// randomly changes one every so often
class RandomUpdatingInt extends React.Component {
  state = {
    int: []
  }
  componentDidMount() {
    this.setRandomInt()
    this.interval = setInterval(this.setRandomInt, this.props.interval)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  setRandomInt = () => {
    this.setState({ int: getRandomInt(this.props.min, this.props.max) })
  }
  render() {
    return React.Children.only(this.props.children(this.state.int))
  }
}

RandomUpdatingInt.defaultProps = {
  min: 0,
  max: 10,
  interval: 500
}

export default RandomUpdatingInt
