import React from 'react'
import styled from 'styled-components'

import {fonts, colors, fontSize} from '../core/styled'

const imageSize = 55

const Container = styled.div`
  margin-bottom: 25px;
  display: flex;
  border-radius: 3px;
  border: 1px solid #fafafa;
  padding: 10px;

  &:hover {
    border: 1px solid #ccc;
    background: #fafafa;
  }

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 20px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const ProfileContainer = styled.div`
  width: ${imageSize}px;
  height: ${imageSize}px;
  background: url(${props => props.src}) no-repeat top center, #ccc;
  background-size: cover;
  border-radius: 3px;
`

const ContentContainer = styled.div`
  width: 0px;

  & h2 {
    margin: 0;
    margin-top: 5px;
    color: ${colors.main};
    font-size: ${fontSize.big}rem;
    font-family: ${fonts.normal};
    letter-spacing: 1px;
  }
`

const QuoteAuthor = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.main};
  font-size: ${fontSize.normal}rem;
  margin-top: 10px;

  & > div {
    display: inline-block;
    width: 20px;
    height: 3px;
    background: #333;
    margin-right: 10px;
    transform: translateY(-3px);
  }
`

const Content = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.small}rem;
  margin-bottom: 10px;

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

export default () => (
  <Container>
    <ProfileContainer src="https://cdn-images-1.medium.com/fit/c/64/64/1*FKjV0WBgu3xhpeUwOSaABQ.jpeg"/>
    <ContentContainer>
      <Content>
        <a href=""><i class="zmdi zmdi-facebook-box"></i> share to Facebook</a>
        <div/>
        <a href=""><i class="zmdi zmdi-twitter-box"></i> share to Twitter</a>
      </Content>
      <h2>“จงเป็นมาตราฐานของคุณภาพ เพราะคนบางคนไม่ได้อยู่ในสิ่งแวดล้อมที่ความสุดยอดเป็นที่ต้องการ”</h2>
      <QuoteAuthor><div/> Chun Rapeepat</QuoteAuthor>
    </ContentContainer>
  </Container>
)
