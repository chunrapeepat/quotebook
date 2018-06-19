const ObjectId = require('mongoose').Types.ObjectId
const Log = require('../models/Log')

// save
// save default log to database
exports.save = (userID, route, data) => {
  const logger = new Log({
    user: new ObjectId(userID),
    route,
    data,
  })

  return logger.save().then(res => res._id)
}
