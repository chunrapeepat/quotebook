import React from 'react'
import {keyframes} from 'emotion'
import styled from 'react-emotion'

import App from '../components/App'
import Fold from '../components/LandingFold'

const Page = styled.div`
  display: flex;

  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`

const Nav = () => <nav />

const Reason = () => <section />

const Action = () => <section />

const Footer = () => <footer />

// Flow 1.1
// Landing Page: Explain Intention of BarCode

const Landing = () => (
  <Page>
    <Nav />
    <Fold />
    <Reason />
    <Action />
    <Footer />
  </Page>
)

export default App(Landing)
