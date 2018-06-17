import React, {Component} from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import axios from 'axios'

import App from '../components/App'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'

import QuoteFetch from '../containers/QuoteFetch'
import Menubar from '../containers/Menubar'
import PopularUser from '../containers/PopularUser'

import {Container, media, fonts, colors, fontSize} from '../core/styled'

const IndexContainer = styled.div`
  display: flex;
  margin-top: 30px;

  & > div:nth-child(1) {
    flex: 3;
    margin-right: 20px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }

  ${media.desktop`
    display: block;

    & > div:nth-child(1) {
      margin-right: 0;
    }
  `}

  ${media.tablet`
    margin-top: 20px;
  `}
`

const Sidebar = styled.div`
  position: sticky;
  top: 20px;
`

const SearchBox = styled.input`
  outline: none;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 7px;
  margin-top: 60px;
  margin-bottom: 30px;

  font-family: ${fonts.normal};
  font-size: ${fontSize.giant}rem;

  ${media.desktop`
    margin-top: 40px;
    margin-bottom: 10px;
    font-size: ${fontSize.giant - 0.5}rem;
  `}

  ${media.tablet`
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: ${fontSize.giant - 0.8}rem;
  `}
`

let timeout

class SearchView extends Component {
  state = {
    query: this.props.query,
    search: this.props.query || '',
    quotes: this.props.quotes,
    done: this.props.done,
  }

  static async getInitialProps({query, req, res}) {
    let q = null
    if (req === undefined) q = query.query
    else q = req.params.query
    // fetch default query
    if (q !== null) {
      const resQuote = await axios.get(encodeURI(`/api/quote/search?query=${q}&page=1`)).then(res => res.data)
      if (resQuote.success) {
        return {quotes: resQuote.payload, done: resQuote.done, query: q}
      }
    }
    return {quotes: [], done: true, query: q}
  }

  fetchApi = query => {
    this.setState({query})
    axios.get(encodeURI(`/api/quote/search?query=${query}&page=1`)).then(res => res.data)
      .then(data => {
        if (data.success) {
          this.setState({quotes: data.payload, done: data.done})
        }
      })
  }

  handleInput = e => {
    clearTimeout(timeout)
    this.setState({search: e.target.value})
    // auto submit after 2 seconds
    timeout = setTimeout(() => {
      Router.push(`/search?id=${this.state.search}`, `/search/${this.state.search}`)
      // update quotes (fetch api)
      this.fetchApi(this.state.search)
    }, 1500)
  }

  handleSubmit = e => {
    clearTimeout(timeout)
    Router.push(`/search?id=${this.state.search}`, `/search/${this.state.search}`)
    // update quotes (fetch api)
    this.fetchApi(this.state.search)

    e.preventDefault()
  }

  render = () => (
      <div>
        <Menubar night/>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <SearchBox
              autoFocus
              value={this.state.search}
              onChange={this.handleInput}
              type="text" placeholder="Search Everything from QuoteBook" />
          </form>

          <IndexContainer>
            <div>
              {this.state.search.length !== 0 &&
                <NotFound msg={<span>
                  Searching for <b>{this.state.search}</b>
                  {this.state.search === this.state.query &&
                    <span>, No results found</span>
                  }
                </span>}/>
              }
              <QuoteFetch
                withProfile
                api={`/api/quote/search?query=${this.state.search || this.props.query}`}
                done={this.state.done}
                quotes={this.state.quotes} />
            </div>

            <div>
              <Sidebar>
                <PopularUser />
                <Footer />
              </Sidebar>
            </div>
          </IndexContainer>
        </Container>
      </div>
  )
}

export default App(SearchView)
