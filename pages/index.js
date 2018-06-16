import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import App from '../components/App'
import Footer from '../components/Footer'

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

const WelcomeContainer = styled.div`
  width: 100%;
  padding: 80px 0;
  background: url(${props => props.src});
  background-size: cover;

  & h1 {
    margin: 0;
    margin-top: 20px;
    color: ${colors.whiteMain};
    font-family: ${fonts.header};
    font-size: ${fontSize.quote}rem;
  }

  & h3 {
    margin: 0;
    color: ${colors.whiteFade};
    font-family: ${fonts.normal};
    font-size: ${fontSize.normal}rem;
  }

  ${media.desktop`
    padding: 70px 20px;

    & h1 {
      font-size: ${fontSize.quote - 0.5}rem;
    }
  `}

  ${media.tablet`
    padding: 50px 20px;
    text-align: center;

    & h1 {
      font-size: ${fontSize.quote - 1}rem;
    }
  `}
`

const DailyQuote = ({src}) => (
  <WelcomeContainer src={src}>
    <Container>
      <h3>WELCOME TO QUOTEBOOK</h3>
      <h1>Collect your own quotes<br/>and share it with everyone.</h1>
    </Container>
  </WelcomeContainer>
)

class IndexView extends Component {
  static async getInitialProps() {
    // fetch api to get quotes
    const resQuote = await axios.get(`/api/quote/getHomeQuote?page=1`).then(res => res.data)
    // return props
    if (resQuote.success) {
      return {done: resQuote.done, quotes: resQuote.payload}
    }

    return {done: true, quotes: []}
  }

  render() {
    return (
      <div>
        <Menubar />
        <DailyQuote src="/static/background.png" />
        <Container>
          <IndexContainer>

            <QuoteFetch
              withProfile={true}
              api={`/api/quote/getHomeQuote?id=none`}
              done={this.props.done}
              quotes={this.props.quotes} />

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
}

export default App(IndexView)
