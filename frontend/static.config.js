import axios from 'axios'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

// site absolute path & title
const title = "QUICKSITE - quickly making static site with react and styled-components"
const siteRoot = "https://localhost:3000"

// render custom html document
class Document extends Component {
  render () {
    const {
      Html, Head, Body, children, renderMeta,
    } = this.props

    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {renderMeta.styleTags}
        </Head>
        <Body>{children}</Body>
      </Html>
    )
  }
}

export default {
  siteRoot,
  getSiteData: () => ({
    title,
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/routes/Home',
      },
      {
        path: '/about',
        component: 'src/routes/About',
      },
      {
        is404: true,
        component: 'src/routes/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document,
}
