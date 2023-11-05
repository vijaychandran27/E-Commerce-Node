const productSchema = require('../models/product');

productSchema.exists((error) => {
  if (error) {
    console.error('Error creating collection:', error);
  } else {
    console.log('Product Collection created or already exists');
  }
});

async function insertProductData() {
  const newProduct = new productSchema({
    name: 'Product Name',
    description: 'Product Description',
    price: 29.99,
  });

  try {
    const savedProduct = await newProduct.save();
    console.log('Product saved:', savedProduct);
  } catch (error) {
    console.error('Error saving product:', error);
  }
}


async function insertDataIfNotExists() {
  try {

    // Count the number of documents that match the condition.
    const data = await productSchema.find().exec();
    if (data.length === 0) {
      // Insert the data if no matching documents are found.
      const result = await insertProductData();
      return result;
    } else {
      // Data already exists; you can choose to handle this case as needed.
      return 'Product Data already exists';
    }
  } catch (error) {
    throw error;
  }
}

module.exports = insertDataIfNotExists;