import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import {Container, fonts, colors} from '../core/styled'

const MenubarContainer = styled.div`
`

const Heading = styled.h1`
  margin: 0;
  font-family: ${fonts.header};
  cursor: pointer;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  font-size: 2rem;
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0;
  top: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
`

const RightContainer = styled.div`
  position: absolute;
  right: 0;
  top: 1rem;
  font-size: 1.2rem;
`

class Menubar extends Component {
  state = {
    isAuthenticate: false,
  }

  render() {
    return (
      <MenubarContainer>
        <Container relative>

          <SearchIcon>
            <i class="zmdi zmdi-search"></i>
          </SearchIcon>

          {!this.state.isAuthenticate &&
            <RightContainer>
              Hi
            </RightContainer>
          }

          <Heading>QuoteBook</Heading>
        </Container>
      </MenubarContainer>
    )
  }
}

export default App(Menubar)
