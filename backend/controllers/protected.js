const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const protectedRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')
const { userExtractor } = require('../utils/middleware')


// route is protected by loginValidator middleware 
protectedRouter.get('/', userExtractor, async (request, response) => {
  console.log('inside protected route')
  


  response.json({ message: 'user/token valid' })
})

protectedRouter.get('/', async (request, response) => {
 
    const accessToken = jwt.sign(user, config.SECRET, {expiresIn: '1m'})
    const refreshToken = jwt.sign(user, config.SECRET, {expiresIn: '1h'})
    const temp = await User.findByIdAndUpdate(user._id, {refreshToken} )
    response.setHeader('Authorization', `Bearer ${accessToken}`);
    response.setHeader('Refresh-Token', `${refreshToken}`);
  
})

module.exports = protectedRouter