const Image = require('../models/Image');

exports.getGallery = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/gallery.html'));
};

