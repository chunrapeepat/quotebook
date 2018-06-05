const express = require('express')
const next = require('next')
const passport = require('passport')
const appConfig = require('./config/app')

const apiHandler = require('./handlers')

const dev = appConfig.environment !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    // middlewares
    server.use(passport.initialize())

    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })

    // api server route
    server.use('/api', apiHandler)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(appConfig.port, err => {
      if (err) throw err
      console.log(`${appConfig.name} v${appConfig.version} listening on port ${appConfig.port}`)
    })
  })
