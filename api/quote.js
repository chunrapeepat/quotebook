const ObjectId = require('mongoose').Types.ObjectId
const Quote = require('../models/Quote')
const Love = require('../models/Love')

// isLoved
// check is loved on not
exports.isLoved = (quoteID, userID) => {
  return new Promise((resolve, reject) => {
    Love.find({
      quote_id: new ObjectId(quoteID),
      user_id: new ObjectId(userID),
    }, (err, docs) => {
      if (err) reject(err)
      if (docs.length) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

// love
// if user doesn't append, if have delete
exports.love = (quoteID, quoteAuthor, userID) => {
  return new Promise((resolve, reject) => {
    Love.find({
      quote_id: new ObjectId(quoteID),
      user_id: new ObjectId(userID),
    }, (err, docs) => {
      if (err) reject(err)
      if (docs.length) {
        // remove the old
        Love.remove({
          quote_id: new ObjectId(quoteID),
          user_id: new ObjectId(userID),
        }, err => {
          if (err) reject(err)
          resolve('success')
        })
      } else {
        // append the new one
        const loved = new Love({
          quote_id: new ObjectId(quoteID),
          quote_author: new ObjectId(quoteAuthor),
          user_id: new ObjectId(userID),
        })
        // save it now!
        loved.save(err => {
          if (err) reject(err)
          resolve('success')
        })
      }
    })
  })
}

// incrementView
exports.incrementView = (quoteID) => {
  return Quote.findOneAndUpdate({
    _id: new ObjectId(quoteID),
  }, {
    $inc: {'views': 1},
  })
}

// getProfileQuote
exports.getProfileQuote = (fbid, page, limit = 10) => {
  return new Promise((resolve, reject) => {
    Quote.find({posted_by: fbid})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_at: 'descending'})
      .exec(async (err, docs) => {
        if (err) reject(err)
        else {
          // get quote count here
          const pArray = docs.map(async doc => {
            const count = await Love.count({quote_id: new ObjectId(doc._id)})
            const quote = JSON.parse(JSON.stringify(doc))
            quote.total_love = count
            return quote
          })
          // passing to promise all
          const quotes = await Promise.all(pArray)
          resolve(quotes)
        }
      })
  })
}

// getSearchQuote
exports.getSearchQuote = (query, page, limit = 10) => {
  return new Promise((resolve, reject) => {
    Quote.find({quote: {
      $regex: query,
      $options: 'i',
    }})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_at: 'descending'})
      .exec(async (err, docs) => {
        if (err) reject(err)
        else {
          // get quote count here
          const pArray = docs.map(async doc => {
            const count = await Love.count({quote_id: new ObjectId(doc._id)})
            const quote = JSON.parse(JSON.stringify(doc))
            quote.total_love = count
            return quote
          })
          // passing to promise all
          const quotes = await Promise.all(pArray)
          resolve(quotes)
        }
      })
  })
}

// getHomeQuote
exports.getHomeQuote = (page, limit = 10) => {
  return new Promise((resolve, reject) => {
    Quote.find({})
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({created_at: 'descending'})
      .exec(async (err, docs) => {
        if (err) reject(err)
        else {
          // get quote count here
          const pArray = docs.map(async doc => {
            const count = await Love.count({quote_id: new ObjectId(doc._id)})
            const quote = JSON.parse(JSON.stringify(doc))
            quote.total_love = count
            return quote
          })
          // passing to promise all
          const quotes = await Promise.all(pArray)
          resolve(quotes)
        }
      })
  })
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
  return new Promise((resolve, reject) => {
    Quote.findOne({_id: new ObjectId(_id)}, (err, doc) => {
      if (err) reject(err)
      Love.count({quote_id: doc._id}, (err, count) => {
        if (err) reject(err)
        let quote = Object.assign({}, doc)._doc
        quote.total_love = count
        resolve(quote)
      })
    })
  })
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
  return Love.aggregate([
    {
      $group: {
        _id: '$quote_author',
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
