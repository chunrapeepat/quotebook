import React, {Component} from 'react'
import styled from 'styled-components'

import {media} from '../core/styled'

const zIndex = 999999

const ModalContainer = styled.div`
  ${props => props.show ? `
    display: block;
  ` : `
    display: none;
  `}
`

const Backdrop = styled.div`
  position: fixed;
  z-index: ${zIndex};

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.8);
`

const Content = styled.div`
  position: fixed;
  z-index: ${zIndex + 1};

  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`

// Modal Component
// receive close function from props `close`
// this function will be call when user click on modal background
// `show` props (true = show) (false = display none)
// `reset` props run when user close modal

export default class extends Component {
  closeModal = () => {
    const {close, reset} = this.props
    if (typeof reset === 'function') {
      reset()
    }
    close()
  }

  render() {
    return (
      <ModalContainer show={this.props.show}>
        <Backdrop onClick={this.closeModal}/>
        <Content>
          {this.props.children}
        </Content>
      </ModalContainer>
    )
  }
}
