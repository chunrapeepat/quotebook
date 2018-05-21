import React from 'react'
import {Provider} from 'react-redux'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'styled-components'

import store from '../ducks'

const enhance = lifecycle({
  // inject global css style
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
      <Component {...props} />
    </Provider>
  ))

export default App
