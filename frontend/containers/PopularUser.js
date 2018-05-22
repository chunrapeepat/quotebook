import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import {fonts, colors} from '../core/styled'

const Container = styled.div`
  width: 100%;
  height: 300px;
  background: ${colors.background};
  border-radius: 3px;
  padding: 7px 12px;
  position: sticky;

  top: 20px;
`

const Heading = styled.div`
  font-family: ${fonts.header};
  color: ${colors.main};
  font-size: 1.5rem;
`

class PopularUser extends Component {
  render() {
    return (
      <Container>
        <Heading>Popular User</Heading>
      </Container>
    )
  }
}

export default App(PopularUser)
