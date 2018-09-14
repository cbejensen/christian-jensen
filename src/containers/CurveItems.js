import React from 'react'
import { getRandomInt } from '../utils'

class CurveItems extends React.Component {
  state = {
    items: []
  }
  componentDidMount() {
    const items = []
    for (var i = 0; i <= this.props.maxItems; i++) {
      // we use 100 to make coords percentage-based
      // we want more shapes to the left side,
      // so we take advantage of getExponentialInt and
      // subtract from 100 to increase chances of low x
      const x = 100 - this.props.getExponentialInt(getRandomInt(0, 100), 100)
      // subtract from 100 to flip the curve
      const yMax = 100 - this.props.getExponentialInt(100 - x, 100)
      const y = getRandomInt(0, yMax)
      // now convert our percentage-based coords to absolute values
      let item = {
        x,
        y
      }
      if (this.props.enableRotation) {
        items.push({ ...item, rotation: getRandomInt(0, 359) })
      } else {
        items.push(item)
      }
    }
    this.setState({ items })
  }
  componentDidUpdate(prevProps, prevState) {}
  getAbsolutePositions = items => {
    return items.map(item => ({
      // change from 100x100-grid-based points (percentages)
      // to the actual pixel location based on container size
      x: (this.props.containerWidth / 100) * item.x,
      y: (this.props.containerHeight / 100) * item.y,
      size: this.props.itemSize
    }))
  }
  sortPoints = items => {
    return items.sort((a, b) => {
      // sort points from closest to 0,0 to farthest
      if (a.x > b.x) {
        return 1
      } else if (a.x < b.x) {
        return -1
      } else {
        // a.x === b.x, so test y
        return a.y > b.y ? 1 : 0
      }
    })
  }
  preventOverlap = items => {
    const sorted = items.sort((a, b) => {
      // sort points from closest to 0,0 to farthest
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
    return sorted.reduce(
      (finalArr, currentItem) => {
        // for each item in the sorted array, see if it's
        // too close to any of the items we've approved so far
        let tooClose
        const getAbsoluteX = xPercentage => {
          return (this.props.containerWidth / 100) * xPercentage
        }
        const getAbsoluteY = yPercentage => {
          return (this.props.containerHeight / 100) * yPercentage
        }
        for (let i = 0; i < finalArr.length; i++) {
          const compareItem = finalArr[i]
          if (
            Math.abs(
              getAbsoluteX(currentItem.x) - getAbsoluteX(compareItem.x)
            ) <= minSeparation &&
            Math.abs(
              getAbsoluteY(currentItem.y) - getAbsoluteY(compareItem.y)
            ) <= minSeparation
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
      [sorted[0]]
    )
  }
  render() {
    if (!this.state.items.length) return null
    const items = this.props.preventOverlap
      ? this.preventOverlap(this.state.items)
      : this.state.items
    return items.map(item => {
      item = { ...item, size: this.props.itemSize }
      return React.Children.only(this.props.children(item))
    })
  }
}
CurveItems.defaultProps = {
  rotationInterval: 500
}

// class RotationHandler extends React.Component {
//   state = {
//     items: []
//   }
//   componentDidMount() {
//     this.setState({ items: this.props.items })
//   }
//   randomlyRotate = items => {
//     this.rotationInterval = setInterval(
//       this.rotateRandomItem,
//       this.props.rotationInterval
//     )
//     return items.map(item => ({
//       ...item,
//       rotation: getRandomInt(0, 359)
//     }))
//   }
//   rotateRandomItem = () => {
//     if (this.state.items.length) {
//       this.setState(prevState => {
//         const updatedItems = [...prevState.items]
//         const index = getRandomInt(0, updatedItems.length - 1)
//         const rotation = updatedItems[index].rotation
//         if (!rotation) return
//         // add 45 degrees to rotation, unless it's within 45 of 359,
//         // in which case we start counting from 0
//         updatedItems[index].rotation =
//           rotation <= 314 ? rotation + 45 : Math.abs(rotation - 359)
//         return updatedItems
//       })
//     }
//   }
//   componentWillUnmount() {
//     clearInterval(this.rotationInterval)
//   }
//   render() {
//     if (!this.state.items.length) return null
//     return this.state.items.map(item => {
//       item = { ...item, size: this.props.itemSize }
//       return React.Children.only(this.props.children(item))
//     })
//   }
// }

export default CurveItems
