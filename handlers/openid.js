const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const router = require('express').Router()

const baseURL = require('../config/app').baseURL
const fbConfig = require('../config/openid').facebook
const User = require('../models/User')

passport.use(new FacebookStrategy({
    clientID: fbConfig.appID,
    clientSecret: fbConfig.appSecret,
    callbackURL: fbConfig.callbackURI,
    profileFields: ['id', 'email', 'displayName', 'photos'],
  },
  function(accessToken, refreshToken, profile, cb) {
    const fbid = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value
    const profileImage = `https://graph.facebook.com/${fbid}/picture?type=large&width=720&height=720`
    // if user not registered, add user to database.
    User.count({fbid}, (err, count) => {
      if (count <= 0) {
        const newUser = new User({
          fbid,
          username: fbid,
          display_name: name,
          email,
          profile_image: profileImage,
        })
        newUser.save().then(() => {
          console.log(`new user registered `, fbid, name)
        })
      }
    })
  }
))

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

router.get('/facebook',
  passport.authenticate('facebook', {scope: ['email']}))

router.get('/facebook-callback', (req, res) => {
  res.redirect(`${baseURL}?code=${req.query.code}`)
  passport.authenticate('facebook', { failureRedirect: '/' })(req, res)
})

module.exports = router
