var router = require("express").Router(),
	User = require("../../models/user"),
	bcrypt = require("bcrypt"),
	jwt = require("jwt-simple"),
	config = require("../../config");

router.post("/", function(req, res, next) {
	User.findOne({username:req.body.username})
	.select("password username scope")
	.exec(function(err, user) {
		if (err) { return next(err); }
		if (!user) { return res.status(401).send(); }
		bcrypt.compare(req.body.password, user.password, function(err, valid) {
			if (err) { return next(err); }
			if (!valid) { return res.status(401).send("Please check your credentials"); }
			var token = jwt.encode({username: user.username}, config.secret);
			var session = {token:token, username:user.username};
			if (user.scope) {
				session.scope = user.scope;
			}
			res.json(session);
		});
	});
});

module.exports = router;