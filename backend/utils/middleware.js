const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body) 
  logger.info('---')
  next()
}

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpont' })
}

const isValidEmail = (email) => {
  // Basic email validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const registerValidator = (request, response, next) => {
  const {email, firstName, lastName, password, confirmPassword } = request.body

  console.log(email, firstName, lastName, password, confirmPassword)
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (firstName.length < 3) {
    return response.status(400).json({ error: 'Name must be at least 3 characters' })
  } else if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return response.status(400).json({error: 'Invalid Email'})
  } else if(!regExp.test(password)) {
    return response.status(400).json({error: 'Password must be 8 characters, contain one uppercase, one lower base, one digit, and a special character @$!%*?&'})
  } else if (password !== confirmPassword) {
    return response.status(400).json( {error: 'Passwords do not match'})
  }

  request.credentials = {email, firstName, lastName, password, confirmPassword }
  next()
}

const loginValidator = async (request, response, next) => {

  const {email, password } = request.body
 

  const user = await User.findOne({ email })
  const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(passwordCorrect && user)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  request.user = user
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error('lne 19', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid'})
  } else if (error.name === 'PasswordError') {
    return response.status(400).json(error.message)
  } else if (error.name === 'refreshTokenError') {
    return response.status(401).json({error: error.message})
  }

  next(error)
}

//takes token from headers
const getTokenFrom = (request) => {
  const authorization = request.get('Authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// adds token to response object
const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)
  next()
}

const verifyAccessToken = async (token, next) => {
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    const error = Error("JsonWebTokenError")
    error.name = 'JsonWebTokenError'
    next(error)
  }
  return decodedToken;
}

const verifyRefreshToken = async (refreshToken, next) => {
  const decodedToken = jwt.verify(refreshToken, process.env.SECRET);
  console.log(refreshToken, decodedToken)
  return decodedToken;
}

const generateAccessToken = async (user, response) => {
  const accessToken = jwt.sign(user, config.SECRET, {expiresIn: config.ACCESSTIME})
  const refreshToken = jwt.sign(user, config.SECRET, {expiresIn: config.REFRESHTIME})
  const temp = await User.findByIdAndUpdate(user._id, {refreshToken} )
  response.setHeader('access-token', `${accessToken}`);
  response.setHeader('refresh-token', `${refreshToken}`);
}

//validates token and adds user to response header
const userExtractor = async (request, response, next) => {
  const accessToken = getTokenFrom(request);
  console.log(accessToken)
  if (accessToken) {
    try {
      const decodedToken = await verifyAccessToken(accessToken);
      request.user = await User.findById(decodedToken.id);
      return next();
    } catch (accessTokenError) {
      console.log('access token expired')
      const refreshToken = request.get('RefreshToken');

      try {
        const decodedRefreshToken = await verifyRefreshToken(refreshToken);
        const user = await User.findById(decodedRefreshToken.id);
        request.user = user
        // update token 
        const userForToken = {
          username: user.email,
          id: user._id,
        }
       ; // Output: true or false
       const error = Error("Access token expired")
        error.name = 'refreshTokenError'
      
      await generateAccessToken(userForToken, response)
       
        
        return next(error)
      } catch (refreshTokenError) {
        console.log('refresh expired')
        // throw new Error('refreshTokenExpired');
        const error = Error("Refresh token expired")
        error.name = 'refreshTokenError'
      
        return next(error)
      }
    }
  }

  return next();

}


module.exports = {
  requestLogger,
  unkownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  registerValidator,
  loginValidator,
}