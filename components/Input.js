import React from 'react'
import styled from 'styled-components'

import {fonts, colors, fontSize} from '../core/styled'

// Components
// - Textarea: default textarea
// - Input: default input

export const Textarea = styled.textarea`
  width: 100%!important;
  height: 100px!important;
  border: 0;
  border-radius: 3px;
  outline: none;
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  background: #fafafa;
  padding: 20px;
  resize: none;
  margin-bottom: 10px;
`

export const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  outline: none;
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}rem;
  background: #f8f8f8;
  border: 0;
  padding: 7px 20px;

  &:focus {
    background: #eee;
  }

  &:hover {
    background: #eee;
  }
`
