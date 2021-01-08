const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  psw: String,
  admin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('User', userSchema);
