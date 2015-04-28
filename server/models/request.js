var db = require("../db");

var Request = db.Schema({
	message: String,
	from: String,
	timestamp: Date,
	completion_time: Date,
	handler: String
});

module.exports = db.model("Request", Request);