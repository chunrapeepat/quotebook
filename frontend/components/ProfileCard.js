import React from 'react'
import styled from 'react-emotion'

import StandardButton from './Button'

// DONE --- Virtual Stickers (Technology Stack)
//   React, Redux, JS, Scala

// DONE --- Roles
//   Frontend, Backend, DevOps, Full Stack

// DONE --- Geek/Dev Topics
//   (Most Devs are Introverted)
//   Agile, Quantum, DevOps, Mob Programming

// DONE --- Personal Interest
//   Music (Thai), 112

// DONE --- GitHub Profile
//   Contribution Count
//   Pinned Projects

const NicknameLabel = styled.span`
  font-weight: 300;
  font-size: 0.8em;
`

const ImageProfile = styled.div`
  width: 100px;
  height: 100px;
  margin: auto auto;
  border-radius: 50%;
  background: url(${props => props.img}) center center;
  background-size: 100px 100px;
`
const FooterContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  background: #fafafa;
  border-top: 1px solid #ccc;
`

const Description = styled.div`
  text-align: center;
  font-size: 1.15em;
  color: #666;
  padding: 15px;
`

const StickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  max-width: 430px;
  margin: 0 auto;
  margin-bottom: 1em;
`

const Sticker = styled.img`width: 4em;`

const StickerLabel = styled.span`
  text-align: center;
  display: block;
  color: #999;
`

const Button = styled(StandardButton)`
  width: 100%;
  display: block;
`

const Padding = styled.div`padding: 20px;`

const UsernameLabel = styled.h1`
  width: 100%;
  margin: 15px 0;
  margin-bottom: 25px;
  text-align: center;
`

const ProfileCard = ({name, nickname}) => (
  <div>
    <Padding>
      <UsernameLabel>
        {name}
        <br />
        <NicknameLabel>({nickname})</NicknameLabel>
      </UsernameLabel>
      <ImageProfile img="https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-9/18670762_758600700980955_3631810700133395059_n.jpg?_nc_eui2=v1%3AAeFMh6JojbUoYo7JihFhz_a-QbImN6UZa5QE733NBRpBSTutxq_PBZGxxYqMKa1ChRmvOBg7CoSsNtHY6DyFF83Z0T-2Aacude_WEcl-wV5oug&oh=c0321f0d2cab01cd347691d1b3f91c84&oe=5AAF3B44" />
    </Padding>
    <Description>
      <b>Full-Stack Web Developer @ Facebook</b> <br />
      <b>Interests</b>: Functional Programming <br />
      <b>GitHub</b>: 650 Commits, 71 Followers <br />
      <b>Hobbies</b>: Music Composition
    </Description>
    <StickerContainer>
      <Sticker src="/static/stickers/react.svg" />
      <Sticker src="/static/stickers/redux.png" />
      <Sticker src="/static/stickers/apollo.png" />
      <Sticker src="/static/stickers/graphql.png" />
    </StickerContainer>
    <StickerLabel>and 16 others...</StickerLabel>
    <FooterContainer>
      <Padding>
        <Button color="#ff7657">Invite</Button>
      </Padding>
    </FooterContainer>
  </div>
)

export default ProfileCard
