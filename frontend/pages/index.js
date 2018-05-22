import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'
import QuoteCard from '../components/QuoteCard'

import {Container} from '../core/styled'
import PopularUser from '../containers/PopularUser'

const IndexContainer = styled.div`
  display: flex;
  margin-top: 30px;

  & > div:nth-child(1) {
    flex: 3;
    margin-right: 20px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const IndexView = () => (
  <div>
    <Menubar />
    <Container>
      <IndexContainer>
        <div>
          <QuoteCard />
          <QuoteCard />
          <QuoteCard />
          <QuoteCard />
          <QuoteCard />
          <QuoteCard />
        </div>
        <div>
          <PopularUser />
        </div>
      </IndexContainer>
    </Container>
  </div>
)

export default App(IndexView)
