import React from 'react'
import Head from 'next/head'
import {Provider} from 'react-redux'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'styled-components'
import hoistNonReactStatics from 'hoist-non-react-statics'

import store from '../ducks'

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
  }
})

const App = Component =>
  enhance(props => (
    <Provider store={store}>
      <div>
        <Head>
          <title>QuoteBook</title>
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
