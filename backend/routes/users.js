import express from 'express'

const router = express.Router()

router.get('/', function(req, res, next) {
  res.send('this is user home')
})

router.get('/hello', function(req, res, next) {
  res.send('this is user home hello')
})

export default router
