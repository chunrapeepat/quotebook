const Quote = require('../models/quote')

// postNew
// add new quote to database
exports.postNew = (fbid, quote, author = '') => {
  const newQuote = new Quote({
    posted_by: fbid,
    author,
    quote,
  })
  // return promise with _id
  return newQuote.save().then(res => res._id)
}
