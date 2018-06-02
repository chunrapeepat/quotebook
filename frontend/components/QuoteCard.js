import React from 'react'
import styled from 'styled-components'

import {fonts, colors, fontSize} from '../core/styled'

const imageSize = 130

const Container = styled.div`
  margin-bottom: 40px;
  display: flex;

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

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const QuoteAuthor = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.main};
  margin-top: 25px;
  font-size: ${fontSize.normal}rem;

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
  margin-top: 10px;

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
    <ProfileContainer src="https://image.ibb.co/g6T0fo/Screen_Shot_2561_05_22_at_13_32_17.png"/>
    <ContentContainer>
      <h2>The avoidance of taxes is the only intellectual pursuit that still carries any reward.</h2>
      <QuoteAuthor><div/> Chun Rapeepat</QuoteAuthor>
      <Content>
        <a href=""><i class="zmdi zmdi-facebook-box"></i> share to Facebook</a>
        <div/>
        <a href=""><i class="zmdi zmdi-twitter-box"></i> share to Twitter</a>
      </Content>
    </ContentContainer>
  </Container>
)
