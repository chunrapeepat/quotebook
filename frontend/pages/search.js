import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'
import QuoteCard from '../components/QuoteCard'
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

const FooterContainer = styled.div`
  padding: 7px 10px;
  margin-top: 20px;
  font-family: ${fonts.normal};
  font-size: ${fontSize.small}rem;

  & > div > a {
    color: ${colors.main};
    margin-right: 10px;
  }

  & > p {
    color: ${colors.content};
  }
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

const Footer = () => (
  <FooterContainer>
    <div>
      <a href="">About us</a>
      <a href="">Facebook</a><br/>
      <a href="">Privacy & Terms</a>
    </div>
    <p>Copyright © 2018 QuoteBook, The Chun Rapeepat Production.</p>
  </FooterContainer>
)

class IndexView extends Component {
  render() {
    return (
      <div>
        <Menubar night/>
        <Container>
          <SearchBox
            autoFocus
            type="text" placeholder="Search Everything from QuoteBook" />
          <IndexContainer>
            <div>
              <QuoteCard />
              <QuoteCard />
              <QuoteCard />
              <QuoteCard />
              <QuoteCard />
              <QuoteCard />
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
}

export default App(IndexView)
