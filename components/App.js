import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import {Provider} from 'react-redux'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'styled-components'
import hoistNonReactStatics from 'hoist-non-react-statics'

import {baseURL} from '../config/app'
import store from '../ducks'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

// inject global css style
const enhance = lifecycle({
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
      }
      * {
        box-sizing: border-box;
      }
    `
  },
})

const App = Component =>
  enhance(props => (
    <Provider store={store}>
      <div>
        <Head>
          <title>QuoteBook</title>
          <meta property="og:image" content={`${baseURL}/static/background.png`} />
          <meta name="author" content="Chun Rapeepat"/>
          <meta name="keywords" content="quote, share, post quote, love, funny, emotional, quotes, steve jobs, chun rapeepat, chunza2542, chun"/>
          <meta name="description" content="The quotes sharing website. tell your story through your quote and share it with everyone."/>
        </Head>
        <Component {...props} />
      </div>
    </Provider>
  ))

const hoistStatics = higherOrderComponent => BaseComponent => {
  const NewComponent = higherOrderComponent(BaseComponent)
  hoistNonReactStatics(NewComponent, BaseComponent)
  return NewComponent
}

export default hoistStatics(App)
