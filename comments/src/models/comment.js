
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

let commentSchema = new Schema({
	page_id: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true,
		ref: 'Page',
	},
	reply_comment_id: {
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	},
	nickname: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},

	created_date: { type: Date, default: Date.now },
});

let Comment = exports.Comment = mongoose.model("Comment", commentSchema);