// database username (admin)
const username = exports.username = 'chun'

// database password (secure)
const password = exports.password = 'password'

// database port
const port = exports.port = '2277'

// database name
const name = exports.name = 'quotebook'

// database host
const host = exports.host = 'localhost'

// mongodb connection url
exports.mongourl = `mongodb://${username}:${password}@${host}:${port}/${name}`

// mongodb setting options
exports.options = {
  autoReconnect: true,
  authMechanism: 'SCRAM-SHA-1',
}
