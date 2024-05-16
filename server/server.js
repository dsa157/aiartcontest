const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Image = require('./models/Image');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aiartcontest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/gallery', async (req, res) => {
  try {
    const query = { user: "dsa157" };
    //const images = await Image.find(query);
    const images = await Image.find({});
    res.render('gallery', { images });

  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


