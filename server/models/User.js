const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    summary: { type: String },
    socialMedia: { type: String },
});

module.exports = mongoose.model('User', UserSchema);

