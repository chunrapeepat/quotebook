import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

export default class BaseDocument extends Document {
  // This will extract the stylesheets ane render to the page.
  static getInitialProps({renderPage}) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags,
    }
  }

  render = () => (
    <html lang="en">
      <Head>
        <title>QuoteBook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface|Chonburi|Merriweather:400,700|Trirong:400,700" rel="stylesheet"/>
        {this.props.styleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  )
}
