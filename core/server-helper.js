const TimeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en')

// date & time format
const datetimeFormat = timestamp => {
  var seconds = Math.floor((Date.now() - timestamp) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

// date & time format to an array
exports.datetimeFormatArr = arr => {
  return arr.map(x => {
    let obj = JSON.parse(JSON.stringify(x))
    obj.created_at = datetimeFormat(obj.created_at)
    return obj
  })
}

exports.datetimeFormat = datetimeFormat
