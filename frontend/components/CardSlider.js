import React, {Component} from 'react'
import {injectGlobal, keyframes, css} from 'emotion'
import styled from 'react-emotion'

import App from './App'
import ProfileCard from './ProfileCard'
import StandardButton from './Button'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideRight = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    margin-right: 100vw;
  }
`

const slideLeft = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    margin-right: -100vw;
  }
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  animation: ${props => props.animation};
  animation-fill-mode: forwards;
`

const Container = styled.div`
  position: absolute;
  overflow: hidden;
  width: calc(100vw - 20px);
  background: white;
  border-radius: 7px;
  height: calc(100vh - 20px);
  margin-top: 10px;
  overflow: none;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`

@App
export default class CardSlider extends Component {
  constructor() {
    super()
    this.state = {
      xDown: null,
      yDown: null,
      animation: `${fadeIn} 1s ease 1`
    }
  }
  componentDidMount() {
    if (document != undefined) {
      document.addEventListener(
        'touchstart',
        this.handleTouchStart.bind(this),
        false
      )
      document.addEventListener(
        'touchmove',
        this.handleTouchMove.bind(this),
        false
      )
    }
  }
  handleTouchStart(event) {
    this.setState({
      xDown: event.touches[0].clientX,
      yDown: event.touches[0].clientY
    })
  }
  handleTouchMove(event) {
    if (!this.state.xDown || !this.state.yDown) {
      return
    }

    let xDiff = this.state.xDown - event.touches[0].clientX,
      yDiff = this.state.yDown - event.touches[0].clientY

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.setState({
          //animation: `${slideRight} 0.3s ease 1`,
        })
      } else {
        this.setState({
          //animation: `${slideLeft} 0.3s ease 1`,
        })
      }
    }

    this.setState({
      xDown: null,
      yDown: null
    })
  }
  render() {
    return (
      <FlexContainer animation={this.state.animation}>
        <Container>
          <ProfileCard name={this.props.name} nickname={this.props.nickname} />
        </Container>
      </FlexContainer>
    )
  }
}
