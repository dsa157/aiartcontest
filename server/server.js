const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const Image = require('./models/Image');
const User = require('./models/User'); // Assuming you have a User model
const config = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aiartcontest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
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

app.get('/submit', (req, res) => {
  res.render('submit', { config });
});

app.post('/submit', upload.single('image'), async (req, res) => {
  try {
    const { title, hashtags, tools } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    let imgBuffer = file.buffer;
    const img = sharp(imgBuffer);
    const metadata = await img.metadata();

    if (metadata.width > config.maxImageDimension || metadata.height > config.maxImageDimension) {
      img.resize({ width: config.maxImageDimension, height: config.maxImageDimension, fit: sharp.fit.inside, withoutEnlargement: true });
      imgBuffer = await img.toBuffer();
    }

    const outputFormat = 'jpg';
    imgBuffer = await img.toFormat(outputFormat).toBuffer();

    const filePath = path.join(__dirname, '../public/images', `${Date.now()}.${outputFormat}`);
    await sharp(imgBuffer).toFile(filePath);

    const image = new Image({
      title,
      url: `/images/${path.basename(filePath)}`,
      hashtags: hashtags.split(' '),
      tools: tools.split(', '),
      user: 'dsa157', // Replace with the actual logged-in user
      createdAt: new Date()
    });

    await image.save();

    res.redirect('/gallery');
  } catch (err) {
    res.status(500).send(err);
  }
});

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
