var router = require("express").Router(),
	User = require("../../models/user"),
	bcrypt = require("bcrypt"),
	config = require("../../config");

router.get("/", function(req, res) {
	if (!req.auth) throw next(new Error("Not authenticated"))
	User.where({username:req.auth.username}).findOne(function(err, user) {
		res.json(user);
	});
});

router.post("/", function(req, res, next) {
	var user = new User({username:req.body.username});
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		user.password = hash;
		User.where({username:req.body.username}).findOne(function(err, resp) {
			if (err) { throw next(err); }
			if (resp) { res.status(409).send("User already exists"); }
			else {
				user.save(function(err, resp) {
					if (err) { throw next(err); }
					res.status(201).send();
				});
			}
		});
	});
});

module.exports = router;