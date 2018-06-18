import React from 'react'
import styled from 'styled-components'

import {fonts, fontSize, colors} from '../core/styled'

const Container = styled.div`
  margin-bottom: 20px;
`

const Message = styled.div`
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
`

export default ({msg}) => (
  <Container>
    <Message>{msg}</Message>
  </Container>
)
