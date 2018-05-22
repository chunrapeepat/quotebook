import styled from 'styled-components'
import Ink from 'react-ink'

import {colors, fonts} from '../core/styled'

const Button = styled.button`
  border: 0;
  position: relative;
  outline: none;
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 3px;
  background: white;

  font-size: 0.8rem;
  color: ${colors.main};
  font-family: ${fonts.normal};

  margin: ${props => props.margin ? props.margin : 0};

  ${props => props.icon ? `
    padding: 0px 8px;
    font-size: 1.2rem;
    transform: translateY(3px);
  ` : ``}

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
    {!props.icon &&
      <Ink />
    }
    {children}
  </Button>
)
