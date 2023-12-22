import axios from 'axios'
const BaseUrl = 'http://localhost:3000/api/products'

const getAll = async () => {
  const response = await axios.get(BaseUrl)
  return response.data
}

const getCategories = async () => {
  const response = await axios.get(`${BaseUrl}/categories`)
  return response.data
}

const getProduct = async (name) => {
  const response = await axios.get(`${BaseUrl}/${name}`)
  return response.data
}


export default { getAll, getCategories, getProduct }