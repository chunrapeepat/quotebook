import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Button from '../components/Button'
import CommentItem from '../components/CommentItem'
import {fonts, colors, fontSize} from '../core/styled'

const Container = styled.div`
  background: ${colors.background};
`

const HeaderContainer = styled.div`
  background: ${colors.main};
  color: ${colors.whiteMain};
  font-family: ${fonts.normal};
  font-size: ${fontSize.big}rem;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 15px 20px;
`

const CommentInput = styled.input`
  outline: none;
  border: 0;
  width: 100%;
  background: #f0f0f0;
  padding: 20px;

  ${'' /* border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px; */}

  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
`

class Menubar extends Component {
  render() {
    return (
      <div>
        <HeaderContainer>
          2 comments
        </HeaderContainer>
        <Container>
          <CommentItem />
          <CommentItem />
          <CommentInput type="text" placeholder="Write a comment..."/>
        </Container>
      </div>
    )
  }
}

export default App(Menubar)
