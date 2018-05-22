import styled from 'styled-components'
// style global variable and function belong here

// all fonts variable
export const fonts = {
  header: `'Abril Fatface', 'Chonburi', cursive`,
  normal: `'Merriweather', 'Trirong', serif`,
}

// all colors variable
export const colors = {
  main: '#212121',
}

// all helper components
export const Container = styled.div`
  width: 1000px;
  margin: auto auto;

  ${props => props.relative ? `
    position: relative;
  ` : ``}
`
