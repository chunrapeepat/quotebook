import styled from 'styled-components'
import Ink from 'react-ink'

import {colors, fonts} from '../core/styled'

const Button = styled.button`
  position: relative;
  border: 0;
  outline: none;
  color: ${colors.main};
  font-size: 0.8rem;
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 3px;
  background: white;
  font-family: ${fonts.normal};

  margin: ${props => props.margin ? props.margin : 0};

  ${props => props.regular ? `
    border: 1px solid #ccc;
  ` : ``}

  ${props => props.width ? `
    width: 100%;
  ` : ``}

  ${props => props.inline ? `
    display: inline-block;
  `: ``}
`

export default ({children, ...props}) => (
  <Button {...props}>
    <Ink />
    {children}
  </Button>
)
