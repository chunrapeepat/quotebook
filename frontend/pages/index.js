import React, {Component} from 'react'

import App from '../components/App'

import Menubar from '../containers/Menubar'

const IndexView = () => (
  <div>
    <Menubar />
  </div>
)

export default App(IndexView)
