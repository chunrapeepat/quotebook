import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import UserItem from '../components/UserItem'
import {fonts, colors, fontSize} from '../core/styled'

const Container = styled.div`
  width: 100%;
  border-radius: 3px;
  padding: 7px 12px;
  position: sticky;
  top: 20px;
  background: ${colors.background};
`

const Heading = styled.div`
  font-family: ${fonts.header};
  color: ${colors.main};
  font-size: ${fontSize.big}rem;
`

class PopularUser extends Component {
  render() {
    return (
      <Container>
        <Heading>Popular User</Heading>
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
        <UserItem />
      </Container>
    )
  }
}

export default App(PopularUser)
