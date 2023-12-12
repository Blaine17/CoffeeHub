const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.TEST_MONGODB_URI

console.log(url)

async function main() {

  mongoose.set('strictQuery',false)
  await mongoose.connect(url)


  const MenuSchema = new mongoose.Schema({
    name: String,
    categories: [mongoose.ObjectId],
  }
  )
  const MenuModel = mongoose.model('Menu', MenuSchema)
  
  const menu = new MenuModel({
    name: 'orderCoffee',
  })

  await menu.save()
  
  const query = await MenuModel.findOne({name: 'orderCoffee'})
  console.log('query._id', query)

  const CategorySchema = new mongoose.Schema({
    displayOrder: Number,
    name: String,
    products: [mongoose.ObjectId],
  })

  const CategoryModel = mongoose.model('Category', CategorySchema)

  const category = new CategoryModel({
    displayOrder: 1,
    name: "Hot Coffees",
    products: query._id
  })


  await category.save()

  const categoryQuery = await CategoryModel.findOne({name: 'Hot Coffees'})
  console.log(categoryQuery)

  mongoose.connection.close()

}

main()

