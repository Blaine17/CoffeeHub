import axios from 'axios'
const BaseUrl = 'http://localhost:3000/api/login'

const login = async (credentials) => {
  const response = await axios.post(BaseUrl, credentials)
  console.log(response)
  return response.data
}

export default { login }