import styled from 'styled-components'
import Ink from 'react-ink'

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-appearance: none;
  border: none;
  outline: none;
  background: white;
  cursor: pointer;

  color: ${props => (props.color ? '#ffffff' : '#555')};
  background: ${props => props.color || '#ffffff'};

  font-size: 1.3em;
  font-weight: 300;
  font-family: Saira Semi Condensed, sans-serif;
  padding: 0.38em 0;
  line-height: 1.3em;
  border-radius: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-4px);
    color: white;
  }
`

export default ({children, ...props}) => (
  <Button {...props}>
    <Ink />
    {children}
  </Button>
)
