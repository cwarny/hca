import Ember from "ember";

export default Ember.Controller.extend({
	websocket: Ember.inject.service(),

	subscribe: function () {
		var socket = this.get("websocket.socket");
		var _this = this;

		socket
			.on("authenticated", function() {
				socket.emit("addToRoom", "admin");
			})
			.on("requestCreated", function(value) {
				_this.get("model").pushObject(Ember.Object.create(value));
			})
			.on("requestHandled", function(value) {
				_this.get("model").findBy("_id", value._id).set("handler", value.handler);
			})
			.on("requestCompleted", function(value) {
				var model = _this.get("model");
				model.removeObject(model.findBy("_id", value._id));
			})
			.on("requestReleased", function(value) {
				_this.get("model").findBy("_id", value._id).set("handler", null);
			})
			.emit("authenticate", { token: this.get("session.token") });
	},

	unsubscribe: function () {
		var socket = this.get("websocket.socket");
		socket.emit("removeFromRoom", "admin");
		socket.removeAllListeners();
	},

	actions: {
		handle: function(req) {
			this.get("websocket").handleRequest(req);
		},
		complete: function(req) {
			this.get("model").removeObject(req);
			this.get("websocket").completeRequest(req);
		},
		release: function(req) {
			this.get("websocket").releaseRequest(req);
		}
	}
});