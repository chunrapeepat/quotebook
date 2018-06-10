const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  // posted_by reference to facebook id
  posted_by: {
    type: String,
    required: true,
  },
  // quote author
  author: {
    type: String,
    default: '',
  },
  // quote
  quote: {
    type: String,
    required: true,
  },
  // created date & time (timestamp)
  created_at: {
    type: Number,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Quote', quoteSchema)
