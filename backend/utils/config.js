require('dotenv').config()

const PORT = process.env.PORT || 3001

console.log(process.env.NODE_ENV)

const ACCESSTIME = process.env.NODE_ENV === 'development'
  ? process.env.ACCESSTOKENEXP
  : 5

const REFRESHTIME = process.env.NODE_ENV === 'development'
  ? process.env.REFRESHTOKENEXP
  : 10
// const ACCESSTIME = process.env.ACCESSTOKENEXP || 5

// const REFRESHTIME = process.env.REFRESHTOKENEXP || 15


const MONGODB_URI = process.env.NODE_ENV === 'development'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

  const SECRET = process.env.SECRET


module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  ACCESSTIME,
  REFRESHTIME
}