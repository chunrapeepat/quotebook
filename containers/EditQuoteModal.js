import React, {Component} from 'react'
import styled from 'styled-components'
import Router from 'next/router'

import Modal from '../components/Modal'
import Button from '../components/Button'
import {Textarea, Input} from '../components/Input'
import {SpanSuccess, SpanError, SpanWaiting} from '../components/Span'

import * as request from '../core/request'
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

const AuthorContainer = styled.div`
  display: flex;
  font-family: ${fonts.normal};

  & > span {
    color: ${colors.content};
    display: block;
    margin-right: 10px;
    transform: translateY(7px);
  }

  & > div {
    flex: 1;
  }
`

// max charaters
const limitChars = 150

// initial state
const initialState = {
  quoteInput: '',
  authorInput: '',
  response: {},
  waiting: false,
}

// PostQuoteModal Component
// - `quote` - default quote
// - `author` - default quote author
// - `quoteID` - default quote id
// - `profile` - default profile image
export default class extends Component {
  state = {
    ...initialState,
    quoteInput: this.props.quote,
    authorInput: this.props.author,
  }

  resetState = () => {
    this.setState({
      ...initialState,
      quoteInput: this.props.quote,
      authorInput: this.props.author,
    })
  }

  quoteHandleChange = e => {
    const value = e.target.value
    if (value.length <= limitChars) {
      this.setState({quoteInput: value})
    }
  }

  authorHandleChange = e => {
    const value = e.target.value
    if (value.length <= 30) {
      this.setState({authorInput: value})
    }
  }

  handleSubmit = e => {
    this.setState({waiting: true})
    // make request
    const {quoteInput, authorInput} = this.state
    request.withToken(`/api/quote/update`, {quote_id: this.props.quoteID, quote: quoteInput, author: authorInput || this.props.author})
      .then(response => {
        this.setState({response, waiting: false})
      })

    e.preventDefault()
  }

  render() {
    const props = this.props
    return (
      <Modal reset={this.resetState} {...props}>
        <Container>
          <Heading>Update Quote</Heading>
          <Content>
            <ProfileImage src={props.profile}/>
            <div>
              <form onSubmit={this.handleSubmit}>
                <Textarea
                  onChange={this.quoteHandleChange}
                  value={this.state.quoteInput}
                  placeholder="Say what you think..." />

                <AuthorContainer>
                  <span>Author</span>
                  <div>
                    <Input
                      onChange={this.authorHandleChange}
                      placeholder={props.displayName}
                      value={this.state.authorInput} />
                  </div>
                </AuthorContainer>

                <Footer>
                  {this.state.quoteInput.length} / {limitChars} chars
                  <div>
                    {!this.state.waiting && !this.state.response.error && !this.state.response.success &&
                      <Button success>Update</Button>
                    }
                    {this.state.waiting &&
                      <SpanWaiting />
                    }
                    {this.state.response.error &&
                      <SpanError>{this.state.response.message}</SpanError>
                    }
                    {this.state.response.success &&
                      <SpanSuccess>Successfully Update</SpanSuccess>
                    }
                  </div>
                </Footer>
              </form>
            </div>
          </Content>
        </Container>
      </Modal>
    )
  }
}
