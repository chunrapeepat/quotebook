const router = require('express').Router()
const appConfig = require('../config/app')
const openidHandler = require('./openid')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`${appConfig.name} v${appConfig.version} api server.`)
})

// openid handler
// - /facebook - redirect to facebook login url
// - /facebook-callback - receive callback from facebook
router.use('/openid', openidHandler)

module.exports = router
