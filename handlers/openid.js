const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const router = require('express').Router()

const baseURL = require('../config/app').baseURL
const fbConfig = require('../config/openid').facebook

passport.use(new FacebookStrategy({
    clientID: fbConfig.appID,
    clientSecret: fbConfig.appSecret,
    callbackURL: fbConfig.callbackURI,
    profileFields: ['id', 'email', 'displayName', 'photos'],
  },
  function(accessToken, refreshToken, profile, cb) {
    // do nothing becase this will not be called!
  }
))

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

router.get('/facebook',
  passport.authenticate('facebook', {scope: ['email']}))

router.get('/facebook-callback', (req, res) => {
  res.redirect(`${baseURL}?code=${req.query.code}`)
})

module.exports = router
