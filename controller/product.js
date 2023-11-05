const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Route to list all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().exec(); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Route to add a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error adding a product' });
  }
});

module.exports = router;
