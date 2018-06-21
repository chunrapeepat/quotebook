import React, {Component} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import {Menu, Dropdown, Modal, notification} from 'antd'
import FacebookProvider, {Comments} from 'react-facebook'
import {connect} from 'react-redux'

import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

import Error from './_error'
import App from '../components/App'

import Menubar from '../containers/Menubar'
import EditQuoteModal from '../containers/EditQuoteModal'

import {baseURL} from '../config/app'
import {datetimeFormat} from '../core/helper'
import * as request from '../core/request'
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
  word-wrap: break-word;
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

const ShareContainer = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.normal}rem;
  margin-top: 10px;
  margin-bottom: 20px;

  & > span {
    width: 4px;
    height: 4px;
    margin: 0 10px;
    display: inline-block;
    transform: translateY(-3px);
    background: ${colors.content};
  }

  & a {
    text-decoration: none;
    color: ${colors.content};
  }

  & a:hover {
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

  & a {
    font-weight: bold;
    color: ${colors.content};
    text-decoration: none;
    margin: 0 5px;
    cursor: pointer;
  }

  & a:hover {
    border-bottom: 2px solid ${colors.content};
  }

  ${media.tablet`
    font-size: ${fontSize.small}rem;
  `}
`

const ActionContainer = styled.div`
  float: right;

  & i {
    font-size: ${fontSize.icon}rem;
  }
`

class QuoteView extends Component {
  state = {
    error: false,
    id: '',
    info: {postedBy:{}},
    editQuoteModal: false,
  }

  static async getInitialProps({query, req, res}) {
    let id = null
    if (req === undefined) id = query.id
    else id = req.params.id

    if (id === undefined) {
      return {refetch: true}
    }
    // increment view on server
    await request.withSecret(`/api/quote/incrementView`, {
      quote_id: id,
    })
    // fetch api to get quote information
    const response = await axios.get(`${baseURL}/api/quote/getQuote?id=${id}`).then(res => res.data)
    if (response.success) {
      return {info: response.payload, id}
    }
    // error user not found or something
    if (response.error && res) res.statusCode = 404
    return {notfound: true}
  }

  componentWillMount = () => {
    if (this.props.info) {
      this.setState({info: this.props.info, id: this.props.id})
    }
  }

  componentDidMount = async () => {
    // refetch again if found
    if (this.props.refetch) {
      const id = window.location.pathname.split("/").pop()
      const response = await axios.get(`${baseURL}/api/quote/getQuote?id=${id}`).then(res => res.data)
      if (response.success) {
        this.setState({info: response.payload, id})
      }
      if (response.error) {
        this.setState({error: true})
      }
    }
  }

  removeQuote = () => {
    const state = this.state
    Modal.confirm({
      title: 'Do you want to delete this quote?',
      async onOk() {
        const res = await request.withToken(`/api/quote/remove`, {quote_id: state.id})
        if (res.success) {
          notification['success']({
            message: 'Success',
            description: 'This quote has been removed.',
          })
         // redirect to home page
         Router.push('/')
        }
        if (res.error) {
          notification['error']({
            message: 'Error',
            description: res.message,
          })
        }
      },
    })
  }

  closeModal = quoteID => async () => {
    this.setState({editQuoteModal: false})
    // fetch profile again and re-render
    const response = await axios.get(`${baseURL}/api/quote/getQuote?id=${this.state.id}`).then(res => res.data)
    if (response.success) {
      this.setState({info: response.payload})
    }
  }

  render() {
    const {info, editQuoteModal} = this.state
    const {user} = this.props
    const {userProfile} = this.props.user
    // render error page if notfound
    if (this.props.notfound || this.state.error) {
      return <Error statusCode={404} />
    }
    return (
      <div>
        <Menubar night/>

        <Head>
          <title>“{this.props.quote || info.quote}” - QuoteBook</title>
          <meta property="og:title" content={`“${this.props.quote || info.quote}” - ${this.props.author || info.author}`} />
          <meta property="og:url" content={`${baseURL}/quote/${this.state.id || this.props.id}`} />
          <meta property="og:image" content={`${baseURL}/static/background.png`} />
          <meta property="og:type" content="website" />
        </Head>

        {user.isUserLogin && userProfile.fbid === info.postedBy.fbid &&
          <EditQuoteModal
            profile={info.postedBy.profileImage}
            quote={info.quote}
            author={info.author}
            quoteID={this.state.id}
            close={this.closeModal(this.state.id)}
            show={editQuoteModal} />
        }

        <Container>
          {info.postedBy.fbid &&
            <DateTime>Posted by
              <Link
                as={`/profile/${info.postedBy.fbid}`}
                href={`/profile?id=${info.postedBy.fbid}`}>{info.postedBy.name}</Link>
              - {datetimeFormat(info.createdAt)}

              {user.isUserLogin && info.postedBy.fbid === userProfile.fbid &&
                <ActionContainer>
                  <Dropdown overlay={(
                    <Menu>
                      <Menu.Item onClick={() => this.setState({editQuoteModal: true})} key="1">Edit Quote</Menu.Item>
                      <Menu.Item onClick={this.removeQuote} key="2">Remove This Quote</Menu.Item>
                    </Menu>
                  )} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      <i className="zmdi zmdi-more"/>
                    </a>
                  </Dropdown>
                </ActionContainer>
              }
            </DateTime>
          }

          <QuoteContainer>
            <QuoteText>“{info.quote}”</QuoteText>
            <QuoteAuthor>
              <div />
              {(info.postedBy.name === info.author || info.author === '') &&
                <ProfileImage src={info.postedBy.profileImage} />
              }
              {info.author || info.postedBy.name}
            </QuoteAuthor>
          </QuoteContainer>

          <ShareContainer>
            {info.views || 0} views
            <span/>
            <FacebookShareButton style={{display: 'inline-block'}} url={`${baseURL}/quote/${this.state.id || this.props.id}`}>
              <a href=""><i className="zmdi zmdi-facebook-box"></i> share to Facebook</a>
            </FacebookShareButton>
            <span/>
            <TwitterShareButton style={{display: 'inline-block'}} url={`${baseURL}/quote/${this.state.id || this.props.id}`}>
              <a href=""><i className="zmdi zmdi-twitter-box"></i> share to Twitter</a>
            </TwitterShareButton>
          </ShareContainer>

          <FacebookProvider appId={1234777286624803}>
            <Comments width="100%" href={`${baseURL}/quote/${this.state.id || this.props.id}`} />
          </FacebookProvider>
          <br/>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default App(connect(mapStateToProps, null)(QuoteView))
