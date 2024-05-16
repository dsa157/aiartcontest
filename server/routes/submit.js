const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');

router.get('/', submitController.getSubmitPage);
router.post('/', submitController.submitArtwork);

module.exports = router;

