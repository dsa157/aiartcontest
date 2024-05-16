const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/art-contest', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/profile', require('./routes/profile'));
app.use('/gallery', require('./routes/gallery'));
app.use('/submit', require('./routes/submit'));
app.use('/login', require('./routes/login'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

