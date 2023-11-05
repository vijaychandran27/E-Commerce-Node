const mongoose = require('./mongoose-connection');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
