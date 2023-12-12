const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const productsRouter = require('./controllers/products')
// const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const uri = "mongodb+srv://blaine1776:ZY4dS5u1bIEYqVBg@ordercoffee.hqhgt6x.mongodb.net/?retryWrites=true&w=majority"

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to DB')
  })

  app.use(cors())
  app.use(express.static('dist'))
  app.use(express.json())
  // app.use(middleware.requestLogger)
  app.use('/api/products', productsRouter)

// app.use(middleware.unkownEndpoing)
// app.use(middleware.errorHandler)

module.exports = app