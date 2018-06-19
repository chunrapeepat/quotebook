const router = require('express').Router()

const middlewares = require('./middlewares')
const baseURL = require('../config/app').baseURL
const quoteAPI = require('../api/quote')
const userAPI = require('../api/user')

const {datetimeFormat, datetimeFormatArr} = require('../core/server-helper')

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
      payload: datetimeFormatArr(quotes),
    })
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
})

// get top 5 popular user
router.get('/getPopularUser', async (req, res) => {
  // get user from database
  try {
    let quotes = await quoteAPI.getTopUser()
    return res.json({
      success: true,
      payload: quotes.map(item => {
        const profile = item.profile[0]
        return {
          total: item.total,
          fbid: profile.fbid,
          name: profile.display_name,
          image: profile.profile_image,
        }
      }),
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
      payload: datetimeFormatArr(quotes),
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
    const quotes = await quoteAPI.getSearchQuote(req.query.query.trim(), req.query.page, quoteLimit)
    return res.json({
      success: true,
      done: quotes.length != quoteLimit,
      payload: datetimeFormatArr(quotes),
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
        createdAt: datetimeFormat(quote.created_at),
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
  const quote = req.body.quote.trim()
  const author = req.body.author.trim()
  // validate quote and author
  if (quote.length > 150 || quote.length <= 0 || author.length > 30) {
    return res.json({
      error: true,
      message: 'Invalid input, please check and try again',
    })
  }
  // add quote to database
  try {
    // get user display name if author is not defined
    const profile = await userAPI.getUserProfile(req.headers.fbid)
    if (typeof profile != 'object') {
      return res.json({
        error: true,
        message: 'Something went wrong, please check and try again',
      })
    }
    // post quote to database
    const id = await quoteAPI.postNew(profile._id, req.headers.fbid, quote || profile.display_name, author)
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

// update quote
router.post('/update', middlewares.userLogged, async (req, res) => {
  const quoteID = req.body.quote_id.trim()
  const updatedQuote = req.body.quote.trim()
  const author = req.body.author.trim()
  // check permission
  try {
    const quote = await quoteAPI.getQuote(quoteID)
    if (quote.posted_by !== req.headers.fbid) {
      return res.json({
        error: true,
        message: `You don't have permission to do this`,
      })
    }
  } catch (e) {
    return res.json({
      error: true,
      message: e.message,
    })
  }
  // validate quote and author
  if (updatedQuote.length > 150 || updatedQuote.length <= 0 || author.length > 30) {
    return res.json({
      error: true,
      message: 'Invalid input, please check and try again',
    })
  }
  // update quote on database
  try {
    const update = await quoteAPI.update(quoteID, updatedQuote, author)
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
        message: `You don't have permission to do this`,
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
