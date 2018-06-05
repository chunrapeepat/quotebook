import express from 'express'

import * as config from './core/config'
import indexRoutes from './routes'
import usersRoutes from './routes/users'

const app = express()

// express middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// root of all routes
app.use('/', indexRoutes)
app.use('/users', usersRoutes)

// start server
app.listen(config.port, () =>
  console.log(`QuoteBook backend is running on port ${config.port}`))
