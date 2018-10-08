import React from 'react'
import { getRandomInt } from '../utils'

class CurveItems extends React.PureComponent {
  state = {
    items: []
  }
  componentDidMount() {
    this.generateItemCoords()
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.containerWidth !== prevProps.containerWidth ||
      this.props.containerHeight !== prevProps.containerHeight ||
      this.props.maxItems !== prevProps.maxItems
    ) {
      this.generateItemCoords()
    }
  }
  generateItemCoords = () => {
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
      items.push(item)
    }
    this.setState({ items })
  }
  addPadding = items => {
    const padding = this.props.itemPadding || this.props.itemSize
    const getAbsoluteX = xPercentage => {
      return (this.props.containerWidth / 100) * xPercentage
    }
    const getAbsoluteY = yPercentage => {
      return (this.props.containerHeight / 100) * yPercentage
    }
    const itemsSorted = items.sort((a, b) => {
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
    const itemsWithPadding = itemsSorted.reduce(
      (finalArray, currentItem, i) => {
        // on first iteration, just return currentItem in array
        if (i === 0) return [currentItem]
        // for each item in the sorted array, see if it's
        // too close to any of the items in our final array
        // that is being built
        let tooClose
        for (let j = 0; j < finalArray.length; j++) {
          const compareItem = finalArray[j]
          const currentX = getAbsoluteX(currentItem.x)
          const currentY = getAbsoluteY(currentItem.y)
          const compareX = getAbsoluteX(compareItem.x)
          const compareY = getAbsoluteY(compareItem.y)
          const xDistance = Math.abs(currentX - compareX)
          const yDistance = Math.abs(currentY - compareY)
          // if both x and y coords are equal to or less than padding
          // these two items are too close
          if (xDistance <= padding && yDistance <= padding) {
            tooClose = true
            break
          }
        }
        if (!tooClose) {
          finalArray.push(currentItem)
        }
        return finalArray
      },
      [itemsSorted[0]]
    )
    return itemsWithPadding
  }
  render() {
    if (!this.state.items.length) return null
    // if item padding was explicitly set as 0, use items array as is
    // otherwise add padding, using item size as default padding (no overlap)
    const items =
      this.props.itemPadding === 0
        ? this.state.items
        : this.addPadding(this.state.items)
    return React.Children.only(this.props.children(items))
  }
}
CurveItems.defaultProps = {
  getExponentialInt: (int, max) =>
    Math.floor(Math.sqrt(Math.pow(max, 2) - Math.pow(int, 2)))
}

export default CurveItems
