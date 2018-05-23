import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'
import QuoteCard from '../components/QuoteCard'
import PopularUser from '../containers/PopularUser'
import {Container, fonts, colors, fontSize} from '../core/styled'

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

const DailyQuoteContainer = styled.div`
  width: 100%;
  padding: 50px 0;
  background: url(${props => props.src});
  background-size: cover;
  text-align: center;

  & h1 {
    margin: 0;
    margin-top: 20px;
    color: ${colors.whiteMain};
    font-family: ${fonts.header};
    font-size: ${fontSize.quote}rem;
  }

  & h2 {
    margin: 0;
    margin-top: 15px;
    color: ${colors.whiteContent};
    font-family: ${fonts.normal};
    font-size: ${fontSize.big}rem;
  }

  & h3 {
    margin: 0;
    color: ${colors.whiteFade};
    font-family: ${fonts.normal};
    font-size: ${fontSize.normal}rem;
  }
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

const DailyQuote = ({src}) => (
  <DailyQuoteContainer src={src}>
    <Container>
      <h3>MOST POPULAR QUOTE TODAY</h3>
      <h1>“จงเป็นมาตราฐานของคุณภาพ เพราะคนบางคนไม่ได้อยู่ในสิ่งแวดล้อมที่ความสุดยอดเป็นที่ต้องการ”</h1>
      <h2>- Chun Rapeepat</h2>
    </Container>
  </DailyQuoteContainer>
)

const IndexView = () => (
  <div>
    <Menubar />
    <DailyQuote src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/moving-through-stars-in-space_-1zccenlb__F0000.png">

    </DailyQuote>
    <Container>
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

export default App(IndexView)
