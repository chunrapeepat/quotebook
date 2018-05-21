import React from 'react'
import styled from 'react-emotion'

const NavbarContainer = styled.div`
  width: 100%;
  background: #293338;
  color: white;
  font-size: 1.5em;
  z-index: 99;
`

const Padding = styled.div`
  padding: 15px;
`

export default () => (
  <NavbarContainer>
    <Padding>
      <span>BarCode</span>
    </Padding>
  </NavbarContainer>
)
