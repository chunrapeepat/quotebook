const TimeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en')

// date & time format
const datetimeFormat = timestamp => {
  TimeAgo.locale(en)
  const timeAgo = new TimeAgo('en-US')
  return timeAgo.format(timestamp)
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
