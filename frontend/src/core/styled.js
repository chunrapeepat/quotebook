import styled, {css} from 'styed-components'

// css global variable
export const fontFamily = `sans-serif`
export const colors = {
  main: '#333',
}

// styled-components helper function
const sizes = {
  giant: 1200,
  desktop: 992,
  tablet: 768,
  phone: 576,
}

// media templates
// ex. ${media.desktop`padding: 0 20px;`}
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const pxSize = sizes[label]
  accumulator[label] = (...args) => css`
    @media (max-width: ${pxSize}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

// grid template

// container component
