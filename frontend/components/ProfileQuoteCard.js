import React from 'react'
import styled from 'styled-components'

import {fonts, colors, fontSize} from '../core/styled'

const Container = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 20px 10px;

  &:nth-child(2n + 1) {
    background-color: ${colors.background};
  }
`

const Feeling = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.fade};
  font-size: ${fontSize.small}rem;
  margin-bottom: 10px;
`

const Quote = styled.h2`
  margin: 0;
  line-height: 30px;
  font-family: ${fonts.normal};
  font-size: ${fonts.giant}rem;
  color: ${colors.main};
`

export default () => (
  <Container>
    <Feeling>FEELING FUNNY</Feeling>
    <Quote>“จงเป็นมาตราฐานของคุณภาพ เพราะคนบางคนไม่ได้อยู่ในสิ่งแวดล้อมที่ความสุดยอดเป็นที่ต้องการ”</Quote>
  </Container>
)
