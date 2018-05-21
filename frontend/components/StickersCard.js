import React, {Component} from 'react'
import {connect} from 'react-redux'
import {keyframes} from 'emotion'
import styled from 'react-emotion'
import Ink from 'react-ink'

import {Card, Button} from '../pages/interest'

import {toggleSticker} from '../ducks/app'

const images = [
  'angular.svg',
  'graphcool.png',
  'redis.svg',
  'vue.png',
  'apollo.png',
  'graphql.png',
  'python.png',
  'redux.png',
  'firebase.png',
  'node.png',
  'react.svg',
  'relay.svg'
]

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;

  margin-bottom: 1em;
`

const Col = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.6em 0;
  width: 15%;

  @media screen and (max-width: 900px) {
    width: 25%;
  }
`

const Sticker = styled.img`
  transition: all 1s cubic-bezier(0.22, 0.61, 0.36, 1);

  width: 3em;
  height: 3em;
  cursor: pointer;

  mix-blend-mode: multiply;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.1))
    ${props => (props.selected ? 'brightness(1.1)' : 'saturate(0)')};

  &:hover {
    transform: scale(1.1);
  }
`

const StickerCardBody = styled.div`
  padding: 1.5em 1.8em;
  background: #f7f7f9;
  margin-top: 1.8em;
`

const StickerCard = ({toggleSticker, stickers, children}) => (
  <Card>
    <StickerCardBody>
      <Row>
        {images.map(sticker => (
          <Col key={sticker}>
            <Sticker
              src={`/static/stickers/${sticker}`}
              onClick={() => toggleSticker(sticker)}
              selected={stickers[sticker]}
            />
          </Col>
        ))}
      </Row>
      {children}
    </StickerCardBody>
  </Card>
)

const mapStateToProps = state => ({
  stickers: state.app.stickers,
  state
})

export default connect(mapStateToProps, {toggleSticker})(StickerCard)
