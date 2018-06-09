const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')
const User = require('../models/User')
const userAPI = require('../api/user')

exports.userLogged = (req, res, next) => {
  if (req.headers["authorization"] === undefined) {
    return res.json({
      error: true,
      message: 'invalid access token',
    })
  }
  // get accessToken from header
  const accessToken = req.headers['authorization'].split(" ")[1]
  // check token is null
  if (accessToken === 'null') {
    return res.json({
      error: true,
      message: 'invalid access token',
    })
  }
  // check in database
  User.count({token: accessToken}, (err, count) => {
    if (count <= 0) {
      return res.json({
        error: true,
        message: 'invalid access token',
      })
    }
  })
  // verify using jsonwebtoken
  jwt.verify(accessToken, jwtConfig.secret, (err, decoded) => {
    if (err) {
      if (decoded.fbid != undefined)
        userAPI.updateToken(decoded.fbid, '')

      return res.json({
        error: true,
        message: 'invalid access token',
      })
    }
    // passing user facebook id
    if (decoded.fbid != undefined)
      req.headers.fbid = decoded.fbid
  })
  // passing token and next()
  req.headers.token = accessToken
  next()
}
