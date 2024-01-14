import axios from 'axios'
const BaseUrl = 'http://localhost:3000/api/protected'

const test = async (credentials, userDispath) => {
  console.log(credentials)
  const response = await axios.get(BaseUrl, {
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
      RefreshToken: credentials.refreshTokens
    }
  }).then(response => {
    console.log(response.data)
    return true
  })
  .catch(error => {
    console.log(error.response.data.error === 'Access token expired')
    if (error.response.data.error === 'Access token expired') {
      console.log(error)
      console.log(error.response.headers['access-token'])
      console.log(error.response.headers['refresh-token'])
      console.log(credentials)
      const refreshTokens = error.response.headers['refresh-token']
      const accessToken = error.response.headers['access-token']
      const authenticatedUser = {...credentials,
        accessToken,
        refreshTokens
      }
      userDispath(authenticatedUser)
      return true
    } 
    console.log(error.response.data.error)
    throw Error(error.response.data.error)
    return error.response.data.error
  })
  return response
}

export default { test }