import React from 'react'
import { getRandomInt, getExponentialInt } from '../utils'

class CurveItems extends React.Component {
  state = {
    items: []
  }
  componentDidMount() {
    let points = this.props.points.map(point => ({
      // change from 100x100-grid-based points (percentages)
      // to the actual pixel location based on container size
      x: (this.props.containerWidth / 100) * point.x,
      y: (this.props.containerHeight / 100) * point.y,
      size: this.props.itemSize
    }))
    if (this.props.preventOverlap) {
      points = this.preventOverlap(points)
    }
    if (this.props.randomlyRotate) {
      points = this.randomlyRotate(points)
    }
    this.setState({ items: points })
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.containerWidth !== this.props.containerWidth ||
      prevProps.containerHeight !== this.props.containerHeight
    ) {
      // this.removeOverlap(this.state.items)
    }
  }
  preventOverlap = points => {
    const sortedPoints = points.sort((a, b) => {
      // sort points so we can see where they overlap more easily
      if (a.x > b.x) {
        return 1
      } else if (a.x < b.x) {
        return -1
      } else {
        // a.x === b.x, so test y
        return a.y > b.y ? 1 : 0
      }
    })
    // if rotation is activated, minimum separation between
    // items is length of diagonal from corner to opposite corner
    // so that no matter how shapes are rotated they will not touch
    const minSeparation = this.props.randomlyRotate
      ? Math.ceil(Math.sqrt(Math.pow(this.props.itemSize, 2) * 2))
      : this.props.itemSize
    return sortedPoints.reduce(
      (finalArr, currentItem, index) => {
        // for each item in the sorted array, see if it's
        // too close to any of the items we've approved so far
        let tooClose
        for (let i = 0; i < finalArr.length; i++) {
          const compareItem = finalArr[i]
          if (
            Math.abs(currentItem.x - compareItem.x) <= minSeparation &&
            Math.abs(currentItem.y - compareItem.y) <= minSeparation
          ) {
            tooClose = true
            break
          }
        }
        if (!tooClose) {
          finalArr.push(currentItem)
        }
        return finalArr
      },
      [sortedPoints[0]]
    )
  }
  randomlyRotate = points => {
    const items = points.map(item => ({
      ...item,
      rotation: getRandomInt(0, 359)
    }))
    this.interval = setInterval(
      this.rotateRandomItem,
      this.props.rotationInterval
    )
    return items
  }
  rotateRandomItem = () => {
    if (this.state.items.length) {
      this.setState(prevState => {
        const updatedItems = [...prevState.items]
        const index = getRandomInt(0, updatedItems.length - 1)
        const rotation = updatedItems[index].rotation
        // add 45 degrees to rotation, unless it's within 45 of 359,
        // in which case we start counting from 0
        updatedItems[index].rotation =
          rotation <= 314 ? rotation + 45 : Math.abs(rotation - 359)
        return updatedItems
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    if (!this.state.items.length) return null
    return this.state.items.map(item =>
      React.Children.only(this.props.children(item))
    )
  }
}
CurveItems.defaultProps = {
  rotationInterval: 500
}

export default CurveItems
