const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fbid: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  username: {
    type: String,
    require: true,
    index: {
      unique: true,
    }
  },
  display_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
  },
  created_at: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  token: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('User', userSchema)
