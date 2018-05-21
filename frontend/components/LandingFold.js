import React from 'react'
import {keyframes} from 'emotion'
import styled from 'react-emotion'
import Link from 'next/link'

import StandardButton from './Button'

const FoldSection = styled.section`
  position: relative;
  width: 100%;
  height: 30em;
  z-index: 1;
  box-shadow: 0 1px 1.5px 1px rgba(0, 0, 0, 0.12);
`

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: #ff7657;
`

const flickerIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.4;
  }
`

const Backdrop = styled.div`
  position: absolute;
  left: 1em;
  right: 1em;
  top: 1em;
  bottom: 1em;
  background-image: url(/static/people.svg);
  filter: brightness(1.2);
  opacity: 0.4;
  z-index: 2;

  animation-name: ${flickerIn};
  animation-duration: 3s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
`

const Content = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
`

const scaleIn = keyframes`
  0% {
    transform: scale(0.7);
  }

  100% {
    transform: scale(1.1);
  }
`

const HeroIcon = styled.div`
  min-width: 11em;
  min-height: 11em;
  background-color: white;
  background-image: url(/static/solar-system.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: 0.4em solid white;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transform: scale(1.1);

  animation-name: ${scaleIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
  transition: all 1s cubic-bezier(0.22, 0.61, 0.36, 1);

  @media screen and (max-width: 900px) {
    min-width: 9.5em;
    min-height: 9.5em;
    margin-bottom: 1.4em;
  }

  &:hover {
    transform: scale(1.2);
    filter: brightness(1.2);
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  max-width: 1000px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 2.5em;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-left: 8em;
  padding: 0.8em;

  @media screen and (max-width: 900px) {
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-left: 0;
  }
`

const Heading = styled.h2`
  margin: 0;
  color: white;
  font-family: Saira Semi Condensed, sans-serif;
  font-weight: 300;
  font-size: 3.4em;

  flex-direction: column;

  @media screen and (max-width: 900px) {
    font-size: 2.1em;
    margin-bottom: 0.3em;
  }
`

const Desc = styled.p`
  margin: 0;
  margin-bottom: 1em;
  color: white;
  font-family: Saira Semi Condensed, sans-serif;
  font-weight: 300;
  font-size: 1.4em;
`

const Button = styled(StandardButton)`
  max-width: 12em;
  border-bottom: 2px solid #ff5e39;

  &:hover {
    background: #ff7657;
  }
`

const Fold = () => (
  <FoldSection>
    <Background />
    <Backdrop />
    <Content>
      <Container>
        <HeroIcon />
        <Header>
          <Heading>Never Code Alone Again.</Heading>
          <Desc>
            BarCode helps you find interesting developers near you, and join
            forces to do something special.
          </Desc>
          <Link href="/interest" passHref>
            <Button>Start a BarCode Meetup</Button>
          </Link>
        </Header>
      </Container>
    </Content>
  </FoldSection>
)

export default Fold
