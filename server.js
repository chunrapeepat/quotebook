const express = require('express')
const https = require('https')
const next = require('next')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const appConfig = require('./config/app')
const dbConfig = require('./config/database')
const apiHandler = require('./handlers')

const dev = appConfig.environment !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// certificate option
const certOptions = {
  key: fs.readFileSync(path.resolve('server.key')),
  cert: fs.readFileSync(path.resolve('server.crt')),
}

// connect to mongo database
mongoose.connect(dbConfig.mongourl, dbConfig.options)
  .then(
    () => console.log(`mongodb has beed connected.`),
    err => { throw err }
  )

app.prepare()
  .then(() => {
    const server = express()

    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })

    // api server route
    server.use('/api', apiHandler)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    https.createServer(certOptions, server).listen(appConfig.port, () => {
      console.log(`${appConfig.name} v${appConfig.version} listening on port ${appConfig.port}`)
    })
  })
