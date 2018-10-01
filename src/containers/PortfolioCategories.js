import React from 'react'
import data from 'portfolioData'

export default class PortfolioCategories extends React.Component {
  state = {
    categories: null
  }
  componentDidMount = () => {
    const categories = Object.keys(data).map(key => ({
      category: key,
      items: data[key]
    }))
    this.setState({
      categories
    })
  }
  render() {
    if (!this.state.categories) return null
    return this.props.children(this.state.categories)
  }
}
