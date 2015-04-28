var io = require("socket.io"),
	socketioJwt = require("socketio-jwt"),
	Request = require("../../models/request"),
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

	socket.on("createRequest", function(value) {
		var r = {  message: value, from: socket.decoded_token.username, timestamp: new Date() };
		var request = new Request(r);
		request.save(function(err, resp) {
			if (err) { throw next(err); }
			socket.broadcast.to("admin").emit("requestCreated", r);
		});
	});

	socket.on("completeRequest", function(value) {
		var request = new Request(value);
		request.update({
			$set: {
				completion_time: new Date()
			}
		}, function(err, nUpdated, resp) {
			socket.broadcast.to("admin").emit("requestCompleted", value);
		});
	});

	socket.on("handleRequest", function(value) {
		var request = new Request(value);
		request.update({
			$set: {
				handler: socket.decoded_token.username
			}
		}, function(err, nUpdated, resp) {
			value.handler = socket.decoded_token.username;
			socket.broadcast.to("admin").emit("requestHandled", value);
		});
	});

	socket.on("releaseRequest", function(value) {
		var request = new Request(value);
		request.update({
			$unset: {
				handler: ""
			}
		}, function(err, nUpdated, resp) {
			socket.broadcast.to("admin").emit("requestReleased", value);
		});
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