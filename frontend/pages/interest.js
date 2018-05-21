import React, {Component} from 'react'
import {connect} from 'react-redux'
import {keyframes} from 'emotion'
import styled from 'react-emotion'
import Ink from 'react-ink'

import App from '../components/App'
import StandardButton from '../components/Button'
import StickersCard from '../components/StickersCard'

import {next, prev} from '../ducks/app'

// Flow 1.2
// What's Your Interest?
// Gather Personal Data

// Phoom (Polyglot)
//  1. GitHub Profile: phoomparin
//    Contribution Count: 680
//    Pinned Projects: Axi, FlipED, SkootarClone
//  2. Stickers: React, Redux, JavaScript, Scala, Kubernetes, Go, Node, Clojure, Kotlin
//  3. Roles: Full Stack Developer @ iTAX
//  4. Geek Topic: Functional Programming, Software Dev Process
//  5. Personal Interest: Thai Royal, Music, Startups, Business

const Backdrop = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(https://kazzkiq.github.io/CodeFlask.js/img/bg-main_2x.png)
    #3d3a4e;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
  max-width: 800px;
  height: 100%;
  min-height: 100vh;
  padding: 3em 2.3em;

  @media screen and (max-width: 800px) {
    padding: 2.5em 1.5em;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(4em);
  }

  100% {
    opacity: 1;
  }
`

export const Card = styled.div`
  position: relative;
  min-width: 30em;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  animation-name: ${fadeIn};
  animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);

  @media screen and (max-width: 900px) {
    min-width: initial;
  }
`

const Heading = styled.h2`
  margin: 0;
  line-height: 1.3em;
  color: #555;
  font-size: 2.3em;
  font-weight: 300;
`

const Desc = styled.p`
  margin: 0.5em 0 0.8em 0;
  color: #777;
  font-size: 1.1em;
  font-weight: 300;
`

const Small = styled.div`
  color: #777;
  font-size: 1.3em;
  font-weight: 300;
`

export const Button = styled(StandardButton)`
  width: 100%;
  box-shadow: 0 2px 5px 0 rgba(255, 118, 87, 0.44);
  border-radius: 1em;

  &:hover {
    background: #ff5e39;
  }
`

const CardBody = styled.div`
  padding: 1.5em 1.8em;
  background: white;
`

const CardImage = styled.div`
  position: relative;
  background-color: white;
  background-image: url(/static/${props => props.img}.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 18em;
  width: 100%;
`

const Progress = styled.div`
  height: 3px;
  width: ${props => props.value || 100}%;
  background: white;
  box-shadow: 0 2px 5px 0 white, 0 2px 10px 0 white;
  transition: all 1s cubic-bezier(0.22, 0.61, 0.36, 1);
`

const TextInput = styled.input`
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #555;
  padding: 0.3em 1em;
  font-size: 1.2em;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  width: 100%;
  margin-bottom: 1.2em;
`

const steps = [
  <div>
    <Desc>
      <b>Welcome!</b> Let's get to know each other. <br />
      We'll let other developers to know you by your GitHub profile.
    </Desc>
  </div>,
  <Desc>
    <b>That's Awesome!</b> <br />
    Now, let's choose some stickers that you're interested in! Pick the stickers
    that match your interest.
  </Desc>,
  <div>
    <Desc>
      <b>Fantastic!</b> <br />
      Could you tell us about your job title? (E.g. Full Stack, Frontend,
      Backend)
    </Desc>
    <TextInput placeholder="My Job Title" key="x" />
  </div>,
  <div>
    <Desc>
      <b>Cool~</b> <br />
      What does interest you the most? (E.g. Agile, Space, Functional
      Programming)
    </Desc>
    <TextInput placeholder="My Geek Interests" key="y" />
  </div>,
  <div>
    <Desc>
      <b>This is almost it!</b> <br />
      Could you tell us what do you enjoy doing, aside programming?
    </Desc>
    <TextInput placeholder="My Hobbies" key="z" />
  </div>
]

const Steps = ({step = 0}) => steps[step]

const stepNames = [
  'The Journey Begins!',
  'Pick some Stickers!',
  'What do you do?',
  "What's your geeky interest?",
  'What else do you enjoy?'
]

const stepImages = ['circle', 'circle', 'circle', 'circle', 'circle']

const stepButtons = [
  'Login with GitHub',
  'Continue',
  'Continue',
  'Continue',
  'Create Your Profile'
]

const Back = styled.div`
  position: absolute;
  left: 1em;
  top: 1em;
  z-index: 1;

  width: 2em;
  height: 2em;
  background: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  cursor: pointer;
`

const OnboardCard = ({step, prev, next}) => (
  <div>
    <Card>
      <Progress value={(step + 1) * 20} />
      <Back onClick={prev} />
      <CardImage img={stepImages[step]}>
        <Ink />
      </CardImage>
      <CardBody>
        <Small>Step {step + 1}</Small>
        <Heading>{stepNames[step]}</Heading>
        <Steps step={step} />
        {step !== 1 && (
          <Button color="#ff7657" onClick={next}>
            {stepButtons[step]}
          </Button>
        )}
      </CardBody>
    </Card>
    {step === 1 && (
      <StickersCard>
        <Button color="#ff7657" onClick={next}>
          {stepButtons[step]}
        </Button>
      </StickersCard>
    )}
  </div>
)

const mapStateToProps = state => ({
  step: state.app.step
})

const ConnectedOnboardCard = connect(mapStateToProps, {prev, next})(OnboardCard)

const OnboardView = () => (
  <Backdrop>
    <Container>
      <ConnectedOnboardCard />
    </Container>
  </Backdrop>
)

export default App(OnboardView)
