import express from 'express'
import passport from 'passport'

import * as config from './core/config'
import indexRoute from './routes'
import usersRoute from './routes/openid'

const app = express()

// express middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())

// root of all routes
app.use('/', indexRoute)
app.use('/openid', openidRoute)

// start server
app.listen(config.port, () =>
  console.log(`QuoteBook backend is running on port ${config.port}`))
