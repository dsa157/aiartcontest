const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  summary: String,
  socialMedia: {
    instagram: String,
    twitter: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
