const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loveSchema = new Schema({
  // quote reference
  quote_id: {
    type: Schema.Types.ObjectId,
    ref: 'Quote',
    required: true,
  },
  // user reference
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // created date & time (timestamp)
  created_at: {
    type: Number,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Love', loveSchema)
