const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')
const { loginValidator } = require('../utils/middleware')


// route is protected by loginValidator middleware 
loginRouter.post('/', loginValidator, async (request, response) => {
  console.log('inside login')
  const {email, password } = request.body
  const user = request.user
  // console.log(email, password)

  // const user = await User.findOne({ email })
  // const passwordCorrect = user === null 
  //   ? false
  //   : await bcrypt.compare(password, user.passwordHash)

  // if(!(passwordCorrect && user)) {
  //   // refactor so middleware handles

  //   return response.status(401).json({
  //     error: 'invalid username or password'
  //   })
  // }

  // set up user extractor function 
 

   
  //error here no username
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  console.log(`access time ${config.ACCESSTIME}`, `refresh time ${config.REFRESHTIME}`)
  const accessToken = jwt.sign(userForToken, config.SECRET, {expiresIn: config.ACCESSTIME})
  const refreshTokens = jwt.sign(userForToken, config.SECRET, {expiresIn: config.REFRESHTIME})
 

  // const findRefreshToken = async () => {
  //   const temp =  await User.findByIdAndUpdate(user._id, {refreshTokens} )

  //   return temp
  // }
  await User.findByIdAndUpdate(user._id, {refreshTokens} )

 


  response.status(200).send({accessToken, refreshTokens, username: user.username, firstName: user.firstName, lastName: user.lastName})
})


module.exports = loginRouter