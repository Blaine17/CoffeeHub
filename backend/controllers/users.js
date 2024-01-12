const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const {registerValidator} = require('../utils/middleware')


// this route is protected by the registerValidator 
usersRouter.post('/', registerValidator, async (request, response, next) => {
  const {email, firstName, lastName, password, confirmPassword } = request.body
 
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds) 

  console.log(passwordHash)

  const user = new User({
    email,
    firstName,
    lastName,
    passwordHash
  })

  console.log(new User())
  const savedUser = await user.save()
  console.log(' created user')
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  console.log('in get')
  const users = await User.find({}).populate('blogs', { 'user': 0 })
  response.json(users)
})

module.exports = usersRouter