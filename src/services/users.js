import axios from 'axios'
const BaseUrl = 'http://localhost:3000/api/users'

const register = async (credentials) => {
  const response = await axios.post(BaseUrl, credentials)
  console.log(response)
  return response.data
}

export default { register }