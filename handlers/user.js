const router = require('express').Router()

const middlewares = require('./middlewares')
const baseURL = require('../config/app').baseURL
const userAPI = require ('../api/user')

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

// get public profile image
router.get('/getProfileImage', async (req, res) => {
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
      profile_image: profile.profile_image,
    },
  })
})

// update bio from profile page
router.post('/updateBio', middlewares.userLogged, async (req, res) => {
  const bio = req.body.bio
  // validate bio string
  if ((bio.length > 200 || bio.length <= 0) && typeof bio != 'string') {
    return res.json({
      error: true,
      message: 'validate error',
    })
  }
  // update on database
  const update = await userAPI.updateBio(req.headers.fbid, bio)
  // check return type
  if (typeof update == 'error') {
    return res.json({
      error: true,
      message: update.message,
    })
  }
  return res.json({
    success: true,
  })
})

// get public profile for render
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
