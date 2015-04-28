var router = require("express").Router(),
	Request = require("../../models/request");

router.get("/", function(req, res) {
	Request.where({
		completion_time: {
			$exists: false
		}
	}).find(function(err, resp) {
		res.json(resp);
	});
});

module.exports = router;