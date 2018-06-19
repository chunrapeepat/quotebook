const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  // user reference to mongo users _id
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // api route request
  route: {
    type: String,
    required: true,
  },
  // request data object
  data: {
    type: Object,
    default: {},
  },
  // created date & time (timestamp)
  created_at: {
    type: Number,
    required: true,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Log', logSchema)
