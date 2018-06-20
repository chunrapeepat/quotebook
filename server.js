const express = require('express')
const http = require('http')
const https = require('https')
const next = require('next')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

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

    // middlewares
    server.use(passport.initialize())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: true}))

    server.get('/profile', (req, res) => {
      return res.redirect('/')
    })

    server.get('/profile/:id', (req, res) => {
      return app.render(req, res, '/profile', req.query)
    })

    server.get('/search/', (req, res) => {
      return app.render(req, res, '/search', req.query)
    })

    server.get('/search/:query', (req, res) => {
      return app.render(req, res, '/search', req.query)
    })

    server.get('/quote', (req, res) => {
      return res.redirect('/')
    })

    server.get('/quote/:id', (req, res) => {
      return app.render(req, res, '/quote', req.query)
    })

    // api server route
    server.use('/api', apiHandler)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    // runing on http
    http.createServer(server).listen(appConfig.port, () => {
      console.log(`${appConfig.name} v${appConfig.version} listening on port ${appConfig.port}`)
    })
    // running on https
    // https.createServer(certOptions, server).listen(appConfig.port, () => {
    //   console.log(`${appConfig.name} v${appConfig.version} listening on port ${appConfig.port}`)
    // })
  })
