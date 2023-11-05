const { Schema, model} = require('mongoose');

// Define a product schema
const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

// Create a model
const Product = model('Product', productSchema);

module.exports = Product;
