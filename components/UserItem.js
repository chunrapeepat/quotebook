import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import {fonts, colors, fontSize} from '../core/styled'

const imageSize = 40

const Container = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 15px;

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 10px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const ProfileImage = styled.div`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  background: url(${props => props.src}) no-repeat top center;
  background-size: cover;
`

const Content = styled.div`
  font-family: ${fonts.normal};

  & > h2 {
    margin: 0;
    font-weight: bold;
    color: ${colors.main};
    font-size: ${fontSize.normal}rem;
  }

  & > div {
    font-size: ${fontSize.small}rem;
    color: ${colors.content};
  }
`

// UserItem Component

export default ({user}) => (
  <Link href={`/profile?id=${user.fbid}`} as={`/profile/${user.fbid}`}>
    <Container>
      <ProfileImage src={user.image} />
      <Content>
        <h2>{user.name}</h2>
        <div>{user.total} quotes</div>
      </Content>
    </Container>
  </Link>
)
