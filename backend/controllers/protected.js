const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const protectedRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')
const { userExtractor, userNullCheck } = require('../utils/middleware')


// route is protected by loginValidator middleware 
protectedRouter.get('/', userExtractor, userNullCheck, async (request, response) => {
  console.log('inside protected route')
  console.log(request.user)


  return response.json({ message: 'user/token valid' })
})

module.exports = protectedRouter