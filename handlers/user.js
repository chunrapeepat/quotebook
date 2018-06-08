const router = require('express').Router()

const middlewares = require('./middlewares')
const baseURL = require('../config/app').baseURL
const userAPI = require ('../api/user')

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

router.get('/profile', async (req, res) => {
  if (!req.query.id) {
    return res.json({
      error: true,
      message: 'id parameter can not be empty',
    })
  }
  // get profile from database
  const profile = await userAPI.getUserProfile(req.query.id)
  if (profile == null || typeof profile != 'object') {
    return res.json({
      error: true,
      message: 'user not found',
    })
  }
  return res.json({
    success: true,
    payload: {
      fbid: profile.fbid,
      profile_image: profile.profile_image,
      display_name: profile.display_name,
      bio: profile.bio,
    },
  })
})

module.exports = router
