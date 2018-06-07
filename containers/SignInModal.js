import React, {Component} from 'react'
import styled from 'styled-components'

import Modal from '../components/Modal'
import Button from '../components/Button'

import {fonts, fontSize, media} from '../core/styled'

const Container = styled.div`
  background: white;
  text-align: center;
  padding: 20px;
  width: 500px;
  border-radius: 5px;

  ${media.tablet`
    width: 90vw;
  `}
`

const Heading = styled.h1`
  margin: 0;
  font-weight: normal;
  font-family: ${fonts.header};
  font-size: ${fontSize.giant}rem;
`

const Desc = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  margin: 20px 0;
`

const JoinImage = styled.div`
  width: 100%;
  height: 170px;
  margin-top: 10px;
  background: url(/static/join.svg) no-repeat center center;
`

export default class extends Component {
  loginWithFacebook = () => {
    window.location.href = '/api/openid/facebook'
  }

  render() {
    const props = this.props
    return (
      <Modal {...props}>
        <Container>
          <Heading>Join QuoteBook</Heading>
          <JoinImage />
          <Desc>Post your own quote to share with everyone, comment, and share. just sign in with your Facebook account.</Desc>
          <Button onClick={this.loginWithFacebook} width facebook>SignIn with Facebook</Button>
        </Container>
      </Modal>
    )
  }
}
