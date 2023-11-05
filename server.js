const express = require('express');
// const mongoose = require('./models/mongoose-connection');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');
const loginRoute = require('./controller/login');
require('./auth/passport-config');
// const Product = require('./models/product');
const productRoutes = require('./controller/product');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', loginRoute);

app.get('/api/ping', (req, res) => {
  if (err) {
    res.status(500).send('Error fetching products');
  } else {
    res.json({ 'status': "sucess", message: 'pong' });
  }
});

app.use('/api', productRoutes);

// app.get('/api/products', (req, res) => {
//   Product.find({}, (err, products) => {
//     if (err) {
//       res.status(500).send('Error fetching products');
//     } else {
//       res.json(products);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // insertDetails();
});
