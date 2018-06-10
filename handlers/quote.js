const router = require('express').Router()

const middlewares = require('./middlewares')
const baseURL = require('../config/app').baseURL
const quoteAPI = require('../api/quote')

router.get('/', (req, res) => {
  res.redirect(baseURL)
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
