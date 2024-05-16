const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    hashtags: { type: [String] },
    tools: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', ImageSchema);

