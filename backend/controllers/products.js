const productsRouter = require('express').Router()
const Menu = require('../models/menu')

productsRouter.get('/', async (request, response) => {
  console.log('inside /')
    
    // query to populate the whole entire menu
    // const menu = await Menu.menuSchema.find({})
    //     .populate({path: 'categories', populate: { path: 'products', populate: { path: 'customizations' }}})
  const menu = await Menu.menuSchema.find({})
    .populate({path: 'categories', populate: { path: 'products'}})

  console.log('line 15', menu)
  return response.json(menu)
})


productsRouter.get('/categories', async (requst, response) => {
    // query to populate the whole entire menu
    // const menu = await Menu.categorySchema.find({})
    //     .populate({ path: 'products', populate: {path: 'customizations'}})

    //only populate categories and products
    const menu = await Menu.categorySchema.find({})
        .populate({ path: 'products'})
  response.json(menu)
})

productsRouter.get('/:name', async (request, response) => {
    const name = request.params.name

    const product = await Menu.productSchema.findOne({ name })
    await product.populate('customizations')
  
  response.json(product)
})

module.exports = productsRouter