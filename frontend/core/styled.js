import styled, {css} from 'styled-components'
// style global variable and function belong here

export const fonts = {
  header: `'Abril Fatface', 'Chonburi', cursive`,
  normal: `'Merriweather', 'Trirong', serif`,
}

export const fontSize = {
  small: 0.8,
  normal: 1,
  icon: 1.2,
  big: 1.3,
  giant: 2,
  quote: 3,
}

export const colors = {
  main: '#333',
  content: '#555',
  fade: '#888',
  background: '#f8f8f8',
}


// all helper function
const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

// all helper components
export const Container = styled.div`
  width: 1000px;
  margin: auto auto;

  ${props => props.relative ? `
    position: relative;
  ` : ``}
`
