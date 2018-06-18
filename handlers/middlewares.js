const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')
const User = require('../models/User')
const userAPI = require('../api/user')

exports.userLogged = async (req, res, next) => {
  if (req.headers["authorization"] === undefined) {
    return res.json({
      error: true,
      message: 'Authentication Error',
    })
  }
  // get accessToken from header
  const accessToken = req.headers['authorization'].split(" ")[1]
  // check token is null
  if (accessToken === 'null') {
    return res.json({
      error: true,
      message: 'Authentication Error',
    })
  }
  // check in database
  const count = User.count({token: accessToken})
  if (count <= 0) {
    return res.json({
      error: true,
      message: 'Authentication Error',
    })
  }
  // verify using jsonwebtoken
  jwt.verify(accessToken, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.json({
        error: true,
        message: 'Authentication Error',
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
