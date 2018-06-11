const router = require('express').Router()

const middlewares = require('./middlewares')
const baseURL = require('../config/app').baseURL
const quoteAPI = require('../api/quote')
const userAPI = require('../api/user')

// limit quotes per page
const quoteLimit = 10

router.get('/', (req, res) => {
  res.redirect(baseURL)
})

// get public quote for profile page
router.get('/getProfileQuote', async (req, res) => {
  if (!req.query.id || !req.query.page) {
    return res.json({
      error: true,
      message: 'parameters can not be empty',
    })
  }
  // get profile from database
  try {
    const quotes = await quoteAPI.getProfileQuote(req.query.id, req.query.page, quoteLimit)
    return res.json({
      success: true,
      done: quotes.length != quoteLimit,
      payload: quotes,
    })
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

// get public quote and information
router.get('/getQuote', async (req, res) => {
  if (!req.query.id) {
    return res.json({
      error: true,
      message: 'id parameter can not be empty',
    })
  }
  // get profile from database
  try {
    const quote = await quoteAPI.getQuote(req.query.id)
    const profile = await userAPI.getUserProfile(quote.posted_by)
    return res.json({
      success: true,
      payload: {
        quote: quote.quote,
        createdAt: quote.created_at,
        author: quote.author,
        postedBy: {
          fbid: profile.fbid,
          name: profile.display_name,
          profileImage: profile.profile_image,
        },
      }
    })
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

// post new quote
router.post('/post', middlewares.userLogged, async (req, res) => {
  const quote = req.body.quote
  const author = req.body.author
  // validate quote and author
  if (quote.length > 150 || quote.length <= 0 || author.length > 30) {
    return res.json({
      error: true,
      message: 'validate error',
    })
  }
  // add quote to database
  try {
    const id = await quoteAPI.postNew(req.headers.fbid, quote, author)
    return res.json({
      success: true,
      payload: {id},
    })
  } catch(e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

module.exports = router
