import React from 'react'
import styled from 'styled-components'

import {fonts, colors, fontSize} from '../core/styled'

const imageSize = 40

const Container = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 15px;

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 10px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const ProfileImage = styled.div`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  background: url(${props => props.src}) no-repeat top center;
  background-size: cover;
`

const Content = styled.div`
  font-family: ${fonts.normal};

  & > h2 {
    margin: 0;
    font-weight: bold;
    color: ${colors.main};
    font-size: ${fontSize.normal}rem;
  }

  & > div {
    font-size: ${fontSize.small}rem;
    color: ${colors.content};
  }
`

export default () => (
  <Container>
    <ProfileImage src="https://cdn-images-1.medium.com/fit/c/64/64/1*FKjV0WBgu3xhpeUwOSaABQ.jpeg" />
    <Content>
      <h2>Chun Rapeepat</h2>
      <div>101 quotes</div>
    </Content>
  </Container>
)
