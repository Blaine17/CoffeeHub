const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') 

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [ true, 'Username Required'],
    unique: true,
    minLength: [2, 'Username must be at least 3 characters, got {value}']
  }, 
  firstName: {
    type: String,
    required: [ true, 'First name Required'],
    unique: true,
    minLength: [2, 'First name must be at least 3 characters, got {value}']
  },
  lastName: {
    type: String,
    required: [ true, 'Last name Required'],
    unique: true,
    minLength: [2, 'Last name must be at least 3 characters, got {value}']
  }, 
  passwordHash: {},
  refreshTokens: { type: String, required: true},
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  proccessorAccountId: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator, {message: 'username is already taken'})
module.exports = mongoose.model('User', userSchema)