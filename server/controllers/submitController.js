const multer = require('multer');
const Image = require('../models/Image');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

exports.getSubmitPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/submit.html'));
};

exports.submitArtwork = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file.');
        }
        const newImage = new Image({
            title: req.body.title,
            url: `/images/${req.file.filename}`,
            hashtags: req.body.hashtags.split(','),
            tools: req.body.tools,
            user: req.userId // This should come from authenticated session
        });
        newImage.save().then(() => {
            res.redirect('/gallery');
        }).catch(err => {
            res.status(500).send('Error saving image.');
        });
    });
};

