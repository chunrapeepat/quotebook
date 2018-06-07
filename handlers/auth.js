const router = require('express').Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')

const baseURL = require('../config/app').baseURL
const fbConfig = require('../config/openid').facebook
const userAPI = require ('../api/user')
const jwtConfig = require('../config/jwt')

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

router.get('/facebook', (req, res) => {
  const code = req.query.code
  // if code is empty return error
  if (code == null) {
    return res.json({
      error: true,
      message: 'code parameter can not be empty.',
    })
  }
  // request access token
  axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${fbConfig.appID}&redirect_uri=${fbConfig.callbackURI}&client_secret=${fbConfig.appSecret}&code=${code}`)
    .then(response => {
      const accessToken = response.data.access_token
      axios.get(`https://graph.facebook.com/v3.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`)
        .then(response => {
          const profile = response.data
          // if user not registered, add user to database.
          userAPI.newUserRegister(profile)
          // sign jwt token expired in 3 hours
          const token = jwt.sign({
            id: profile.id,
          }, jwtConfig.secret, { expiresIn: '3h' })
          // update token on database
          userAPI.updateToken(profile.id, token)
          // response token
          return res.json({
            success: true,
            payload: {
              token,
            }
          })
        })
        .catch(err => {
          // bad request
          return res.json({
            error: true,
            message: 'invalid verification code.'
          })
        })
    })
    .catch(err => {
      // bad request
      if (err.response.status == 400) {
        return res.json({
          error: true,
          message: 'invalid verification code.'
        })
      }
    })
})

module.exports = router
