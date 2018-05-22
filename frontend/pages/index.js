import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'
import QuoteCard from '../components/QuoteCard'

const IndexView = () => (
  <div>
    <Menubar />
    <QuoteCard />
    <QuoteCard />
    <QuoteCard />
    <QuoteCard />
    <QuoteCard />
    <QuoteCard />
  </div>
)

export default App(IndexView)
