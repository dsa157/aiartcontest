const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/view', profileController.getProfileView);
router.get('/edit', profileController.getProfileEdit);
router.post('/edit', profileController.updateProfile);

module.exports = router;

