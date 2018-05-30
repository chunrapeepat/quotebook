import React, {Component} from 'react'
import styled from 'styled-components'

import App from '../components/App'
import Menubar from '../containers/Menubar'
import ProfileQuoteCard from '../components/ProfileQuoteCard'
import {Container, fonts, colors, fontSize} from '../core/styled'

const imageSize = 230;

const ProfileContainer = styled.div`
  display: flex;

  & > div:nth-child(1) {
    width: ${imageSize}px;
    margin-right: 30px;
  }

  & > div:nth-child(2) {
    flex: 1;
  }
`

const ProfileImage = styled.div`
  width: ${imageSize}px;
  height: ${imageSize}px;
  background: url(${props => props.src}) no-repeat center center;
  border: 1px solid ${colors.main};
  background-size: cover;
  border-radius: 5px;
`

const ProfileName = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.big}rem;
  margin-top: 20px;
  color: ${colors.main};
`

const Bio = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  color: ${colors.content};
  margin-top: 10px;
  line-height: 25px;
`

const BioIcon = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  margin-top: 20px;
  color: ${colors.content};

  & div {
    margin-top: 5px;
  }

  & i {
    width: 20px;
  }
`

const Sticky = styled.div`
  position: sticky;
  top: 20px;
`

const QuoteView = () => (
  <div>
    <Menubar />
    <Container with-margin>
      <ProfileContainer>

        <div>
          <Sticky>
            <ProfileImage src="https://cdn-images-1.medium.com/max/280/1*FKjV0WBgu3xhpeUwOSaABQ@2x.jpeg" />
            <ProfileName>Chun Rapeepat</ProfileName>
            <Bio>Hello, I'm Chun Rapeepat, 18 y/o full-stack developer from Thailand. Our mission is to build software for solving problems & expand the circle with communities.</Bio>
            <BioIcon>
              <div><i className="zmdi zmdi-case"></i> Founder at QuoteBook</div>
              <div><i className="zmdi zmdi-pin"></i> Bangkok, Thailand</div>
              <div><i className="zmdi zmdi-facebook-box"></i> Chun Rapeepat</div>
              <div><i className="zmdi zmdi-link"></i> https://thechun.xyz</div>
            </BioIcon>
          </Sticky>
        </div>

        <div>
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
          <ProfileQuoteCard />
        </div>

      </ProfileContainer>
    </Container>
  </div>
)

export default App(QuoteView)
