import express from 'express'
import passport from 'passport'
import {Stategy as FacebookStrategy} from 'passport-facebook'

const router = express.Router()

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user)
    // })
  }
))

router.get('/facebook', passport.authenticate('facebook'))

export default router
