// default port
exports.port = 3000

// Application name
exports.name = 'QuoteBook'

// Current app version
exports.version = '1.4'

// Current environment
const env = exports.environment = process.env.NODE_ENV || 'development'

// Base url
exports.baseURL = env === 'production' ? 'https://quotebook.xyz' : 'http://localhost:3000'
