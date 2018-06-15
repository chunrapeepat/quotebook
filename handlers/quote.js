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

// get quotes for home page
router.get('/getHomeQuote', async (req, res) => {
  if (!req.query.page) {
    return res.json({
      error: true,
      message: 'page parameter can not be empty',
    })
  }
  // get quotes from database
  try {
    let quotes = await quoteAPI.getHomeQuote(req.query.page, quoteLimit)
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

// get public quote for search
router.get('/search', async (req, res) => {
  if (!req.query.query || !req.query.page) {
    return res.json({
      error: true,
      message: 'parameters can not be empty',
    })
  }
  // get profile from database
  try {
    const quotes = await quoteAPI.getSearchQuote(req.query.query, req.query.page, quoteLimit)
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
    // get user display name if author is not defined
    const profile = {}
    if (author.length <= 0) {
      profile = await userAPI.getUserProfile(req.headers.fbid)
      if (typeof profile != 'object') {
        return res.json({
          error: true,
          message: 'validate error',
        })
      }
    }
    // post quote to database
    const id = await quoteAPI.postNew(req.headers.fbid, quote || profile.display_name, author)
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

// remove quote
router.post('/remove', middlewares.userLogged, async (req, res) => {
  const quoteID = req.body.quote_id
  // get posted by
  try {
    const quote = await quoteAPI.getQuote(quoteID)
    // check permission
    if (quote.posted_by !== req.headers.fbid) {
      return res.json({
        error: true,
        message: `you don't have permission to do this`,
      })
    }
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
  // remove quote from database
  try {
    const remove = await quoteAPI.remove(quoteID)
    return res.json({
      success: true,
    })
  } catch(e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

module.exports = router
