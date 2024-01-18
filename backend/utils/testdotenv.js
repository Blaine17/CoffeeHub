const pathToEnv = require('path').join(__dirname, '../.env');

require('dotenv').config({path: pathToEnv}); // Load environment variables from .env file

// Export the environment variables
console.log(process.env.TESTREFRESHTOKENEXP)
module.exports = {
  TESTACCESSTOKENEXP: process.env.TESTACCESSTOKENEXP,
  TESTREFRESHTOKENEXP: process.env.TESTREFRESHTOKENEXP,
    // Add more variables as needed
};