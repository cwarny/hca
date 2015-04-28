var express = require("express"),
	app = express(),
	router = express.Router(),
	io = require("./controllers/socket.io"),
	errorHandlers = require("./controllers/errorhandlers");

router.use(require("body-parser").json());
router.use(require("./auth"));
router.use("/sessions", require("./controllers/api/sessions"));
router.use("/users", require("./controllers/api/users"));
router.use("/requests", require("./controllers/api/requests"));
router.use(errorHandlers.error);
router.use(errorHandlers.notFound);

app.use("/api", router);

var server = app.listen(3000);
io.startIo(server);