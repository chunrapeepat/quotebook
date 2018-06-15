import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import App from '../components/App'
import UserItem from '../components/UserItem'

import {fonts, media, colors, fontSize} from '../core/styled'

const Container = styled.div`
  width: 100%;
  border-radius: 3px;
  padding: 7px 12px;
  background: ${colors.background};

  ${media.tablet`
    display: none;
  `}
`

const Heading = styled.div`
  font-family: ${fonts.header};
  color: ${colors.main};
  font-size: ${fontSize.big}rem;
`

class PopularUser extends Component {
  state = {
    users: [],
  }

  componentWillMount = async () => {
    const res = await axios.get(`/api/quote/getPopularUser`).then(res => res.data)
    if (res.success) {
      this.setState({users: res.payload})
    }
  }

  render() {
    return (
      <Container>
        <Heading>Popular User</Heading>
        {this.state.users.map((user, i) => {
          return <UserItem user={user} key={`user_${i}`} />
        })}
      </Container>
    )
  }
}

export default App(PopularUser)
