import express from 'express'

import * as config from '../core/config'

const router = express.Router()

router.get('/', function(req, res, next) {
  res.send(`QuoteBook backend v${config.version}`)
})

export default router
