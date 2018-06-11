import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import QuoteCard from '../components/QuoteCard'
import {LoadMoreButton} from '../components/Button'
import {fonts, colors, fontSize} from '../core/styled'

// QuoteFetch Container
// `quotes` - default quotes
// `done` - is done for loading
// `api` - api path
// `withProfile` - render profile image
class QuoteFetch extends Component {
  state = {
    quotes: this.props.quotes || [],
    done: this.props.done,
    page: 2,
    loading: false,
  }

  loadMoreQuotes = () => {
    this.setState({loading: true})
    axios.get(`${this.props.api}&page=${this.state.page}`).then(res => res.data)
      .then(res => {
        if (res.success) {
          const payload = res.payload
          this.setState({page: this.state.page + 1, quotes: [...this.state.quotes, ...payload]})
          this.setState({loading: false, done: res.done})
        }
      })
  }

  render() {
    return (
      <div>
        {this.state.quotes.map((quote, i) => {
          return <QuoteCard withProfile={this.props.withProfile} data={quote} key={`quote_${i}`}/>
        })}
        {!this.state.done &&
          <LoadMoreButton onClick={this.loadMoreQuotes} loading={this.state.loading}/>
        }
      </div>
    )
  }
}

export default QuoteFetch
