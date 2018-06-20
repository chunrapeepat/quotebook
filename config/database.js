// database username (admin)
const username = exports.username = 'quotebook'

// database password (secure)
const password = exports.password = 'cQ7rSJP3nyyZEkHjydZw8C3m792Ebq'

// database port
const port = exports.port = '27017'

// database name
const name = exports.name = 'quotebook'

// database host
const host = exports.host = '35.240.204.140'

// mongodb connection url
exports.mongourl = `mongodb://${username}:${password}@${host}:${port}/${name}`

// mongodb setting options
exports.options = {
  autoReconnect: true,
  authMechanism: 'SCRAM-SHA-1',
}
