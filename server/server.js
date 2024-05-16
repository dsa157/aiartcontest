const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Image = require('./models/Image');
const User = require('./models/User'); // Assuming you have a User model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aiartcontest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Gallery route
app.get('/gallery', async (req, res) => {
  try {
    const query = req.query.q || '';
    const regex = new RegExp(query, 'i');
    const images = await Image.find({
      $or: [
        { hashtags: regex },
        { user: regex }
      ]
    });
    res.render('gallery', { images });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Image display route
app.get('/image/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    const user = await User.findOne({ username: image.user });
    res.render('image-display', { image, user });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Profile route
app.get('/profile/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const images = await Image.find({ user: username });
    res.render('profile', { user, images });
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
