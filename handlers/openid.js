const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const router = require('express').Router()

const fbConfig = require('../config/openid').facebook

passport.use(new FacebookStrategy({
    clientID: fbConfig.appID,
    clientSecret: fbConfig.appSecret,
    callbackURL: fbConfig.callbackURI,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('got new user', profile)
  }
))

router.get('/facebook', (req, res) => {
  res.send('facebook')
})

router.get('/facebook-callback', (req, res) => {
  res.send('facebook-callback')
})

// app.get('/auth/facebook', passport.authenticate('facebook', {scope:"email"}));
// app.get('/auth/facebook/callback', passport.authenticate('facebook',
// { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router
