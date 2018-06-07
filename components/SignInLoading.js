import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

const zIndex = 999999

const Container = styled.div`
  position: fixed;
  z-index: ${zIndex};

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.8);

  & > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`

export default () => (
  <Container>
    <div>
      <ReactLoading type="spin" color="white" height={70} width={70} />
    </div>
  </Container>
)
