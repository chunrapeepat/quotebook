const router = require('express').Router()
const appConfig = require('../config/app')

const openidHandler = require('./openid')
const authHandler = require('./auth')

router.get('/', (req, res) => {
  res.send(`${appConfig.name} v${appConfig.version} api server.`)
})

// openid route
// - /facebook - redirect to facebook login url
// - /facebook-callback - receive callback from facebook
router.use('/openid', openidHandler)

// auth route : authenticate
// - /auth/facebook - authenticate facebook response code
router.use('/auth', authHandler)

module.exports = router
