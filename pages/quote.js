import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Error from './_error'
import App from '../components/App'

import Menubar from '../containers/Menubar'
import QuoteComment from '../containers/QuoteComment'

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

class QuoteView extends Component {
  static async getInitialProps({query, req, res}) {
    let id = null
    if (req === undefined) id = query.id
    else id = req.params.id
    // fetch api to get quote information
    const response = await axios.get(`/api/quote/getQuote?id=${id}`).then(res => res.data)
    if (response.success) {
      return {info: response.payload}
    }
    // error user not found or something
    if (response.error && res) res.statusCode = 404
    return {info:{}, notfound: true}
  }

  render() {
    const {info} = this.props
    // render error page if notfound
    if (this.props.notfound) {
      return <Error statusCode={404} />
    }
    return (
      <div>
        <Menubar night/>
        <Container>

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

          <QuoteComment />
        </Container>
      </div>
    )
  }
}

export default App(QuoteView)
