import React from 'react'
import data from 'portfolioData'

export default class PortfolioCategories extends React.Component {
  state = {
    categories: null
  }
  componentDidMount = () => {
    // convert to array
    const array = Object.keys(data).map(key => ({
      title: key,
      items: Object.values(data[key])
    }))
    this.setState({
      categories: array
    })
  }
  render() {
    if (!this.state.categories) return null
    return React.Children.only(this.props.children(this.state.categories))
  }
}
