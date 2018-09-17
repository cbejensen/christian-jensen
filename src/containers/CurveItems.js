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
        y,
        size: this.props.itemSize
      }
      items.push(item)
    }
    this.setState({ items })
  }
  componentDidUpdate() {
    console.log(this.props.containerWidth)
  }
  addPadding = items => {
    const getAbsoluteX = xPercentage => {
      return (this.props.containerWidth / 100) * xPercentage
    }
    const getAbsoluteY = yPercentage => {
      return (this.props.containerHeight / 100) * yPercentage
    }
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
    return sorted.reduce(
      (finalArr, currentItem) => {
        // for each item in the sorted array, see if it's
        // too close to any of the items we've approved so far
        let tooClose
        for (let i = 0; i < finalArr.length; i++) {
          const compareItem = finalArr[i]
          // padding is amount of pixels between each item
          const padding = this.props.itemPadding || this.props.itemSize
          const xTooClose =
            Math.abs(
              getAbsoluteX(currentItem.x) - getAbsoluteX(compareItem.x)
            ) <= padding
          const yTooClose =
            Math.abs(
              getAbsoluteY(currentItem.y) - getAbsoluteY(compareItem.y)
            ) <= padding
          tooClose = xTooClose && yTooClose
          if (tooClose) break
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
    console.log('curve item rendered')

    if (!this.state.items.length) return null
    // if item padding was explcitily set as 0, use items array as is
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
