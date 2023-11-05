const userSchema = require('../models/user');

userSchema.exists((error) => {
  if (error) {
    console.error('Error creating collection:', error);
  } else {
    console.log('User Collection created or already exists');
  }
});

async function insertProductData() {
  const newProduct = new userSchema({
    username: 'Admin',
    password: 'Admin@123',
  });

  try {
    const savedProduct = await newProduct.save();
    console.log('User saved:', savedProduct);
  } catch (error) {
    console.error('Error saving product:', error);
  }
}


async function insertDataIfNotExists() {
  try {

    // Count the number of documents that match the condition.
    const data = await userSchema.find().exec();
    if (data.length === 0) {
      // Insert the data if no matching documents are found.
      const result = await insertProductData();
      return result;
    } else {
      // Data already exists; you can choose to handle this case as needed.
      return 'User Data already exists';
    }
  } catch (error) {
    throw error;
  }
}

module.exports = insertDataIfNotExists;