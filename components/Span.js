import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

import {fonts, colors, fontSize} from '../core/styled'

// Components
// - SpanSuccess: span success
// - SpanError: span error
// - SpanWaiting: span loading for waiting something

export const SpanSuccess = styled.span`
  font-family: ${fonts.normal};
  color: green;
`

export const SpanError = styled.span`
  font-family: ${fonts.normal};
  color: red;
`

export const SpanWaiting = () => (
  <span>
    <ReactLoading type="spin" color={colors.main} height={25} width={25} />
  </span>
)
