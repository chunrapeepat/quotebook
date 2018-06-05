import React, {Component} from 'react'
import styled from 'styled-components'

import Modal from '../components/Modal'
import Button from '../components/Button'
import {Textarea, Input} from '../components/Input'

import {fonts, fontSize, media, colors} from '../core/styled'

const Container = styled.div`
  background: white;
  width: 700px;
  border-radius: 5px;

  ${media.desktop`
    width: 90vw;
  `}
`

const Heading = styled.h1`
  margin: 0;
  font-weight: normal;
  font-family: ${fonts.header};
  font-size: ${fontSize.big}rem;
  color: ${colors.main};
  background: ${colors.background};
  padding: 10px 0;
  text-align: center;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const Content = styled.div`
  display: flex;
  padding: 20px;

  & > div:nth-child(2) {
    flex: 1;
  }

  ${media.tablet`
    padding: 10px;
  `}
`

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  border-radius: 3px;
  margin-right: 20px;

  ${media.tablet`
    display: none;
  `}
`

const Footer = styled.div`
  margin-top: 20px;
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.small}rem;

  & > div {
    float: right;
  }
`

export default class extends Component {
  render() {
    const props = this.props
    return (
      <Modal {...props}>
        <Container>
          <Heading>New Quote</Heading>
          <Content>
            <ProfileImage src="https://cdn-images-1.medium.com/fit/c/64/64/1*FKjV0WBgu3xhpeUwOSaABQ.jpeg"/>
            <div>
              <Textarea placeholder="Say what you think..." />
              <Input placeholder="Chun Rapeepat" value="Chun Rapeepat" />
              <Footer>
                10 / 300 chars
                <div>
                  <Button success>Post to Timeline</Button>
                </div>
              </Footer>
            </div>
          </Content>
        </Container>
      </Modal>
    )
  }
}
