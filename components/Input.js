import React from 'react'
import styled from 'styled-components'

import {fonts, colors, fontSize} from '../core/styled'

// Components
// - Textarea: default textarea
// - Input: default input

export const Textarea = styled.textarea`
  width: 100%!important;
  height: 100px!important;
  border-radius: 3px;
  outline: none;
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  background: #fafafa;
  border: 1px solid #ddd;
  padding: 20px;
  resize: none;
`

export const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  outline: none;
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  background: #fdfdfd;
  border: 1px solid #ddd;
  padding: 10px 20px;

  &:focus {
    background: #fafafa;
    border: 1px solid #ccc;
  }
`
