import React from 'react'
import styled from 'styled-components'
import {fonts, colors, fontSize} from '../core/styled'

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

export default () => (
  <FooterContainer>
    <div>
      <a href="">About us</a>
      <a href="">Facebook</a><br/>
      <a href="">Privacy & Terms</a>
    </div>
    <p>Copyright © 2018 QuoteBook, The Chun Rapeepat Production.</p>
  </FooterContainer>
)
