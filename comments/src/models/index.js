const { DB, Log } =  require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = `mongodb://${DB.HOSTNAME}/${DB.DATABASE}`;

mongoose.connect(db, {
	server: { poolSize: 20 }
}, function (err) {
	if (err) {
		Log.fatal('connect to %s error: ', db, err.message);
		process.exit(1);
	}
});

const page = require('./page');
exports.Page = page.Page;

const comment = require('./comment');
exports.Comment = comment.Comment;
