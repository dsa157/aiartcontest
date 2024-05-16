const User = require('../models/User');

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
};

exports.login = (req, res) => {
    // Authenticate user
};

exports.register = (req, res) => {
    // Register new user
};

