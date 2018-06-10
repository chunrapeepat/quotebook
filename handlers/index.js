const router = require('express').Router()
const appConfig = require('../config/app')

const openidHandler = require('./openid')
const quoteHandler = require('./quote')
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
// - /user/profile?id=xxx - get user public profile (get)
router.use('/user', userHandler)

// quote route
// - /quote/post - post new quote (post)
// - /quote/getQuote - get quote public (get)
router.use('/quote', quoteHandler)

module.exports = router
