const mongoose = require('mongoose')
require('dotenv').config()

const menuSchema = new mongoose.Schema({
  name: String,
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
})

menuSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const categorySchema = new mongoose.Schema({
  displayOrder: Number,
  name: String,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const assestsSchema = new mongoose.Schema({
  imgUrl: String
})

const productSchema = new mongoose.Schema({
  displayOrder: Number,
  name: String,
  availability: Boolean,
  assests: {type: assestsSchema},
  customizations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customization'}],
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const customizationSchema = new mongoose.Schema({
  name: String,
  selection: [String],
  amount: [String]
})

customizationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // console.log('line 59' ,returnedObject)
    delete returnedObject.__v
    // for some reason this transform methods gets called twice on a model leading to an undefined !returnedObject._id breaking the application this stops from breaking
    if (!returnedObject._id) return 
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})



module.exports = {
  menuSchema: mongoose.model('Menu', menuSchema),
  categorySchema: mongoose.model('Category', categorySchema),
  customizationSchema: mongoose.model('Customization', customizationSchema),
  productSchema: mongoose.model('Product', productSchema)
}