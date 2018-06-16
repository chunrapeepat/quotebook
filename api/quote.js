const ObjectId = require('mongoose').Types.ObjectId
const Quote = require('../models/quote')

// getProfileQuote
exports.getProfileQuote = (fbid, page, limit = 10) => {
  try {
    return Quote.find({posted_by: fbid})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_at: 'descending'})
  } catch (e) {
    return e
  }
}

// getSearchQuote
exports.getSearchQuote = (query, page, limit = 10) => {
  try {
    return Quote.find({quote: {
      $regex: query,
      $options: 'i',
    }})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_at: 'descending'})
  } catch (e) {
    return e
  }
}

// getHomeQuote
exports.getHomeQuote = (page, limit = 10) => {
  try {
    return Quote.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_at: 'descending'})
  } catch (e) {
    return e
  }
}

// postNew
// add new quote to database
exports.postNew = (ref, fbid, quote, author = '') => {
  const newQuote = new Quote({
    posted_by_ref: new ObjectId(ref),
    created_at: Date.now(),
    posted_by: fbid,
    author,
    quote,
  })
  // return promise with _id
  return newQuote.save().then(res => res._id)
}

// remove
// remove quote from database
exports.remove = (quoteID) => {
  return Quote.remove({_id: new ObjectId(quoteID)})
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
// update quote
exports.update = (quoteID, quote, author) => {
  const _id = new ObjectId(quoteID)
  if (author.length <= 0) {
    return Quote.update({
      _id,
    }, {
      $set: {
        quote,
      },
    })
  } else {
    return Quote.update({
      _id,
    }, {
      $set: {
        quote,
        author,
      },
    })
  }
}

// get user id sorted by quotes
exports.getTopUser = () => {
  return Quote.aggregate([
    {
      $group: {
        _id: '$posted_by_ref',
        total: {$sum: 1},
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'profile',
      },
    }
  ])
    .sort({total: 'desc'})
    .limit(5)
}
