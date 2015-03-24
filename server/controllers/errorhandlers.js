exports.notFound = function notFound(req, res, next) {
	res.status(404).send();
};

exports.error = function error(err, req, res, next) {
	res.status(500).send();
};