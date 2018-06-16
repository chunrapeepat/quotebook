const router = require('express').Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const middlewares = require('./middlewares')
const baseURL = require('../config/app').baseURL
const fbConfig = require('../config/openid').facebook
const userAPI = require ('../api/user')
const jwtConfig = require('../config/jwt')

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

router.post('/logout', middlewares.userLogged, async (req, res) => {
  const token = req.headers.token
  // find profile from token
  try {
    const profile = await User.findOne({token})
    // remove token from database
    userAPI.updateToken(profile.fbid, '')
    return res.json({
      success: true,
    })
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

router.post('/token', middlewares.userLogged, async (req, res) => {
  const token = req.headers.token
  // find profile from token
  try {
    const profile = await User.findOne({token})
    return res.json({
      success: true,
      payload: {
        fbid: profile.fbid,
        display_name: profile.display_name,
        profile_image: profile.profile_image,
        token,
      }
    })
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

router.get('/facebook', async (req, res) => {
  const code = req.query.code
  // if code is empty return error
  if (code == null) {
    return res.json({
      error: true,
      message: 'code parameter can not be empty.',
    })
  }
  // request access token
  try {
    const accessToken = await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${fbConfig.appID}&redirect_uri=${fbConfig.callbackURI}&client_secret=${fbConfig.appSecret}&code=${code}`)
      .then(res => res.data.access_token)
    // request for user profile
    const profile = await axios.get(`https://graph.facebook.com/v3.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`)
      .then(res => res.data)
    // if user not registered, add user to database.
    userAPI.newUserRegister(profile)
    // sign jwt token expired in 3 hours
    const token = jwt.sign({
      fbid: profile.id,
    }, jwtConfig.secret, { expiresIn: '3h' })
    // update token on database
    userAPI.updateToken(profile.id, token)
    // response token
    const userProfile = await userAPI.getUserProfile(profile.id)
    // banned check
    if (userProfile.banned) {
      userAPI.updateToken(profile.id, '')
      return res.json({
        error: true,
        message: 'this user has been banned.'
      })
    }
    // response token & user profile
    return res.json({
      success: true,
      payload: {
        fbid: userProfile.fbid,
        display_name: userProfile.display_name,
        profile_image: userProfile.profile_image,
        token,
      }
    })
  } catch (e) {
    return res.json({
      error: true,
      message: 'invalid verification code.'
    })
  }
})

module.exports = router
