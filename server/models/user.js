var db = require("../db");

var User = db.Schema({
	username: String,
	scope: String,
	password: { type: String, select: false }
});

module.exports = db.model("User", User);