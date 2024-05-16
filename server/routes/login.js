const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.getLoginPage);
router.post('/login', loginController.login);
router.post('/register', loginController.register);

module.exports = router;

