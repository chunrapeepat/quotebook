const router = require('express').Router()
const appConfig = require('../config/app')

const openidHandler = require('./openid')
const authHandler = require('./auth')
const userHandler = require('./user')

router.get('/', (req, res) => {
  res.send(`${appConfig.name} v${appConfig.version} api server.`)
})

// openid route
// - /facebook - redirect to facebook login url (get)
// - /facebook-callback - receive callback from facebook (get)
router.use('/openid', openidHandler)

// auth route : authenticate
// - /auth/logout - remove token from database (post)
// - /auth/facebook - authenticate facebook response code (get)
// - /auth/token - authenticate with token (post)
router.use('/auth', authHandler)

// user route
// - /profile?id=xxx - get user public profile (get)
router.use('/user', userHandler)

module.exports = router
