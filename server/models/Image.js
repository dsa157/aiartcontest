// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: String,
  url: String,
  hashtags: [String],
  tools: [String],
  user: String,
  createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
