const mongoose = require('mongoose');
// const insertDetails = require('../insertDetails');

// Replace 'your-database-uri' with your MongoDB database URI.
const dbUri = 'mongodb://localhost:27017/ecommerce_db';

// Connect to the MongoDB database
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event handling for successful connection
db.on('connected', () => {
  console.log(`Connected to the database on ${dbUri}`);
});

// Event handling for connection errors
db.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Event handling for disconnection
db.on('disconnected', () => {
  console.log('Database connection disconnected');
});

db.once('open', () => {
  console.log('Connected to MongoDB');

  // Call the insertProductData function to insert data into the database
  // insertDetails();
  require('../insertDetails');
});

// Close the Mongoose connection when the Node process exits
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed due to app termination');
    process.exit(0);
  });
});

// Export the Mongoose instance
module.exports = mongoose;
