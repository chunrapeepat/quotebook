import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Button from '../components/Button'
import {fonts, fontSize, colors} from '../core/styled'

const Page = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  padding: 20px;
  transform: translateY(-50%);
`

const Heading = styled.h2`
  margin: 0 auto;

  color: ${colors.main};
  font-weight: 300;
  font-family: ${fonts.header};
  font-size: ${fontSize.quote}em;
`

const Text = styled.p`
  color: ${colors.content};
  line-height: 1.8em;
  text-align: center;
  margin-bottom: 30px;
  font-family: ${fonts.normal};
  font-size: ${fontSize.normal}em;
`

const Error = ({statusCode}) => (
  <Page>
    <Heading>ERROR 404</Heading>
    <Text>
      Sorry! The page you were looking for could not be found.
    </Text>
    <Link href='/'>
      <Button regular>GO BACK TO HOME PAGE</Button>
    </Link>
  </Page>
)

Error.getInitialProps = ({res, jsonPageRes}) => {
  const statusCode = res ? res.statusCode : (jsonPageRes && jsonPageRes.status)
  return {statusCode}
}

export default Error
