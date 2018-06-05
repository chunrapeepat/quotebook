import express from 'express'
import * as config from './config'

const app = express()

// express middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// api homepage

app.listen(config.port, () =>
  console.log(`QuoteBook backend is running on port ${config.port}`))
