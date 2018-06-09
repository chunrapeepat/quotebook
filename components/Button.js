import styled from 'styled-components'
import Ink from 'react-ink'

import {colors, fonts, fontSize} from '../core/styled'

// Button Component Props

// - icon: button for icon (bigger font size)
// - width: make button full of width
// - inline: display inline-block

// - none: default button with no border & background
// - regular: default button with border
// - facebook: facebook button
// - success: green button

const Button = styled.button`
  border: 0;
  position: relative;
  outline: none;
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 3px;
  background: white;

  color: ${colors.main};
  font-size: ${fontSize.small}rem;
  font-family: ${fonts.normal};

  margin: ${props => props.margin ? props.margin : 0};

  & i {
    margin-right: 5px;
  }

  ${props => props.icon ? `
    padding: 0px 8px;
    font-size: ${fontSize.icon}rem;
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

  ${props => props.facebook ? `
    color: white;
    padding: 10px;
    background: #415A94;
  `: ``}

  ${props => props.success ? `
    background: #00AD0B;
    color: white;
  `: ``}

  ${props => props.link ? `
    border-bottom: 2px solid white;
    border-radius: 0;
    text-align: left;
    padding: 0;
    padding-bottom: 5px;
    color: #777;

    &:hover {
      color: #333;
      border-bottom: 2px solid #333;
    }
  `: ``}
`

export default ({children, ...props}) => (
  <Button {...props}>
    {!props.icon || !props.link &&
      <Ink />
    }
    {children}
  </Button>
)
