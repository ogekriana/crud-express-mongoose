const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: String,
	name: String,
	tags: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);