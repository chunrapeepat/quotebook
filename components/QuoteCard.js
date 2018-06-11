import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import {datetimeFormat} from '../core/helper'
import {fonts, media, colors, fontSize} from '../core/styled'

const imageSize = 55

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  border-radius: 3px;
  border: 1px solid #fafafa;
  padding: 10px;

  &:hover {
    border: 1px solid #ccc;
    background: #FDFDFD;
  }

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 20px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }

  ${media.tablet`
    margin-bottom: 10px;
  `}
`

const ProfileContainer = styled.div`
  width: ${imageSize}px;
  height: ${imageSize}px;
  background: url(${props => props.src}) no-repeat top center, #ccc;
  background-size: cover;
  border-radius: 3px;

  ${props => props.noprofile ? `
    display: none;
  ` : ``}
`

const ContentContainer = styled.div`
  width: 0px;

  & h2 {
    margin: 0;
    margin-top: 5px;
    color: ${colors.main};
    font-size: ${fontSize.big}rem;
    font-family: ${fonts.normal};
    letter-spacing: 1px;
    cursor: pointer;
  }
`

const QuoteAuthor = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.main};
  font-size: ${fontSize.normal}rem;
  margin-top: 10px;

  & > div {
    display: inline-block;
    width: 20px;
    height: 3px;
    background: #333;
    margin-right: 10px;
    transform: translateY(-3px);
  }
`

const Content = styled.div`
  font-family: ${fonts.normal};
  color: ${colors.content};
  font-size: ${fontSize.small}rem;
  margin-bottom: 10px;

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
`

// QuoteCard Component
// noprofile props: remove profile image from card
// data props: response from server

// data props example:
// {
//   "author": "Chun Rapeepat",
//   "created_at": 1528619806968,
//   "_id": "5b1ce436f92878f83659bc2c",
//   "posted_by": "949619975212359",
//   "quote": "restaurant is just an object containing the result to your query. It does not have a findOne method, only Restaurant does.",
//   "__v": 0
// }

export default ({ noprofile, data }) => (
  <Container>
    <ProfileContainer noprofile={noprofile} src="https://cdn-images-1.medium.com/fit/c/64/64/1*FKjV0WBgu3xhpeUwOSaABQ.jpeg"/>
    <ContentContainer>
      <Content>
        {datetimeFormat(data.created_at)}
      </Content>
      <Link href={`/quote?id=${data._id}`} as={`/quote/${data._id}`}>
        <h2>“{data.quote}”</h2>
      </Link>
      <QuoteAuthor><div/> {data.author}</QuoteAuthor>
    </ContentContainer>
  </Container>
)
