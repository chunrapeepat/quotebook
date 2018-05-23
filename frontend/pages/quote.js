import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'
import QuoteComment from '../containers/QuoteComment'

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

const ActionContainer = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.normal}rem;
  margin-bottom: 20px;

  & > div {
    width: 4px;
    height: 4px;
    margin: 0 10px;
    display: inline-block;
    transform: translateY(-3px);
    background: ${colors.content};
  }

  & > a {
    text-decoration: none;
    color: ${colors.content};
  }

  & > a:hover {
    text-decoration: underline;
  }

  & i {
    margin-right: 3px;
  }
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

      <ActionContainer>
        <i class="zmdi zmdi-star-outline"></i> <span>300</span>
        <div/>
        <a href=""><i class="zmdi zmdi-facebook-box"></i> share to Facebook</a>
        <div/>
        <a href=""><i class="zmdi zmdi-twitter-box"></i> share to Twitter</a>
      </ActionContainer>

      <QuoteComment />
    </Container>
  </div>
)

export default App(QuoteView)
