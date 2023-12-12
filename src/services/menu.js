import axios from 'axios'
const BaseUrl = 'http://localhost:3000/api/products'

const getAll = async () => {
  const response = await axios.get(BaseUrl)
  console.log(response.data)
  return response.data
}

const getCategories = async () => {
  const response = await axios.get(`${BaseUrl}/categories`)
  console.log(response.data)
  return response.data
}

const getProduct = async (name) => {
  const response = await axios.get(`${BaseUrl}/${name}`)
  console.log(response.data)
  return response.data
}


export default { getAll, getCategories, getProduct }