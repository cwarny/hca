var io = require("socket.io"),
	socketioJwt = require("socketio-jwt"),
	config = require("../../config");

var socketConnection = function socketConnection(socket) {
	// socket.emit("message", { message: "Welcome, " + socket.decoded_token.username });
	
	socket.on("addToRoom", function(roomName) {
		console.log("joining " + roomName + " room");
		socket.join(roomName);
	});
	socket.on("removeFromRoom", function(roomName) {
		console.log("leaving " + roomName + " room");
		socket.leave(roomName);
	});

	socket.on("message", function(value) {
		socket.broadcast.to("admin").emit("message", { message: value, from: socket.decoded_token.username });
	});
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
};

exports.startIo = function startIo(server) {
	io = io.listen(server);

	io.of("/hca").on("connection", socketioJwt.authorize({ // See https://facundoolano.wordpress.com/2014/10/11/better-authentication-for-socket-io-no-query-strings/ on how and why to use token-based auth with socket.io
		secret: config.secret,
		timeout: 15000
	}));

	io.sockets.on("authenticated", socketConnection);

	return io;
};