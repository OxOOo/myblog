
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

let pageSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true,
		index: true
	},

	created_date: { type: Date, default: Date.now },
});

let Page = exports.Page = mongoose.model("Page", pageSchema);