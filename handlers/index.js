const express = require('express')
const appConfig = require('../config/app')

const openidHandler = require('./openid')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`${appConfig.name} v${appConfig.version} api server.`)
})

router.get('/openid', openidHandler)

module.exports = router
