import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import FacebookProvider, {Comments} from 'react-facebook'

import Error from './_error'
import App from '../components/App'

import Menubar from '../containers/Menubar'

import {datetimeFormat} from '../core/helper'
import {Container, media, fonts, colors, fontSize} from '../core/styled'

const QuoteContainer = styled.div`
  padding: 80px;
  padding-bottom: 100px;

  ${media.desktop`
    padding: 80px 50px;
    padding-bottom: 90px;
  `}

  ${media.tablet`
    padding: 50px 20px;
    padding-bottom: 70px;
  `}
`

const QuoteText = styled.h1`
  font-family: ${fonts.header};
  margin: 0;
  font-size: ${fontSize.quote}rem;
  letter-spacing: 1px;

  ${media.desktop`
    font-size: ${fontSize.quote - 0.5}rem;
  `}

  ${media.tablet`
    font-size: ${fontSize.quote - 1.5}rem;
  `}
`

const QuoteAuthor = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.main};
  margin-top: 25px;

  & > div {
    display: inline-block;
    width: 20px;
    height: 3px;
    background: #333;
    margin-right: 10px;
    transform: translateY(-3px);
  }
`

const ActionContainer = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.normal}rem;
  margin-bottom: 20px;

  & > div {
    width: 4px;
    height: 4px;
    margin: 0 10px;
    display: inline-block;
    transform: translateY(-3px);
    background: ${colors.content};
  }

  & > a {
    text-decoration: none;
    color: ${colors.content};
  }

  & > a:hover {
    text-decoration: underline;
  }

  & i {
    margin-right: 3px;
  }

  ${media.tablet`
    font-size: ${fontSize.small}rem;
  `}
`

const ProfileImage = styled.span`
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  transform: translateY(7px);
`

const DateTime = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  color: ${colors.content};
  margin-top: 20px;

  ${media.tablet`
    font-size: ${fontSize.small}rem;
  `}
`

class QuoteView extends Component {
  state = {
    error: false,
    info: {postedBy:{}},
  }

  static async getInitialProps({query, req, res}) {
    let id = null
    if (req === undefined) id = query.id
    else id = req.params.id

    if (id === undefined) {
      return {refetch: true}
    }
    // fetch api to get quote information
    const response = await axios.get(`/api/quote/getQuote?id=${id}`).then(res => res.data)
    if (response.success) {
      return {info: response.payload}
    }
    // error user not found or something
    if (response.error && res) res.statusCode = 404
    return {notfound: true}
  }

  componentWillMount = () => {
    if (this.props.info) {
      this.setState({info: this.props.info})
    }
  }

  componentDidMount = async () => {
    // refetch again if found
    if (this.props.refetch) {
      const id = window.location.pathname.split("/").pop()
      const response = await axios.get(`/api/quote/getQuote?id=${id}`).then(res => res.data)
      if (response.success) {
        this.setState({info: response.payload})
      }
      if (response.error) {
        this.setState({error: true})
      }
    }
  }

  render() {
    const {info} = this.state
    // render error page if notfound
    if (this.props.notfound || this.state.error) {
      return <Error statusCode={404} />
    }
    return (
      <div>
        <Menubar night/>
        <Container>
        <DateTime>Posted by {info.postedBy.name} - {datetimeFormat(info.createdAt)}</DateTime>

          <QuoteContainer>
            <QuoteText>“{info.quote}”</QuoteText>
            <QuoteAuthor>
              <div />
              <ProfileImage src={info.postedBy.profileImage} />
              {info.author || info.postedBy.name}
            </QuoteAuthor>
          </QuoteContainer>

          <ActionContainer>
            <a href=""><i class="zmdi zmdi-facebook-box"></i> share to Facebook</a>
            <div/>
            <a href=""><i class="zmdi zmdi-twitter-box"></i> share to Twitter</a>
          </ActionContainer>

          <FacebookProvider appId={1234777286624803}>
            <Comments width="100%" href="https://localhost/quote/5b1cd8c19557c6f3089f58d1" />
          </FacebookProvider>
          <br/>
        </Container>
      </div>
    )
  }
}

export default App(QuoteView)
