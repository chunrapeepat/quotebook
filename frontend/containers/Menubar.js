import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Button from '../components/Button'
import {Container, fonts, colors} from '../core/styled'

const MenubarContainer = styled.div`
  padding: 7px 0;
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
  top: 0.5rem;
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
              <Button inline margin="0 10px">Sign in</Button>
              <Button inline regular>About QuoteBook</Button>
            </RightContainer>
          }

          <Heading>QuoteBook</Heading>
        </Container>
      </MenubarContainer>
    )
  }
}

export default App(Menubar)
