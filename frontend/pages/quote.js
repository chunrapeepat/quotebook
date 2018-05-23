import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'

import {Container, fonts, colors, fontSize} from '../core/styled'

const imageSize = 200

const QuoteContainer = styled.div`
  display: flex;
  margin: 80px 0;

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 50px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const QuoteText = styled.h1`
  font-family: ${fonts.header};
  margin: 0;
  font-size: ${fontSize.quote}rem;
  letter-spacing: 1px;
`

const QuoteAuthor = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.main};
  margin-top: 25px;

  & > div {
    display: inline-block;
    width: 20px;
    height: 3px;
    background: #333;
    margin-right: 10px;
    transform: translateY(-3px);
  }
`

const ProfileContainer = styled.div`
  width: ${imageSize}px;
  height: ${imageSize * 2}px;
  background: url(${props => props.src}) no-repeat top center, #ccc;
  background-size: cover;
`

const QuoteView = () => (
  <div>
    <Menubar />
    <Container>
      <QuoteContainer>
        <ProfileContainer src="https://image.ibb.co/g6T0fo/Screen_Shot_2561_05_22_at_13_32_17.png"/>
        <div>
          <QuoteText>“จงเป็นมาตราฐานของคุณภาพ เพราะคนบางคนไม่ได้อยู่ในสิ่งแวดล้อมที่ความสุดยอดเป็นที่ต้องการ”</QuoteText>
          <QuoteAuthor>
            <div />
            Chun Rapeepat
          </QuoteAuthor>
        </div>
      </QuoteContainer>
    </Container>
  </div>
)

export default App(QuoteView)
