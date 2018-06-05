const express = require('express')
const appConfig = require('../config/app')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`${appConfig.name} v${appConfig.version} api server.`)
})

module.exports = router
