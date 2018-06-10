const ObjectId = require('mongoose').Types.ObjectId
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

// getQuote
// get quote by quote id (_id)
exports.getQuote = _id => {
  try {
    return Quote.findOne({_id: new ObjectId(_id)})
  } catch(e) {
    return e
  }
}
