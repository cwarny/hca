import Ember from "ember";

export default Ember.Controller.extend({
	websocket: Ember.inject.service(),

	pendingRequests: function() {
		return Ember.A([]);
	}.property(),

	subscribe: function () {
		var socket = this.get("websocket.socket");
		var _this = this;
		socket
			.on("authenticated", function() {
				console.log("authenticated");
				socket.emit("addToRoom", "admin");
			})
			.on("message", function(value) {
				_this.get("pendingRequests").pushObject(value);
			})
			.emit("authenticate", { token: this.get("session.token") });
	},

	unsubscribe: function () {
		var socket = this.get("websocket.socket");
		socket.emit("removeFromRoom", "admin");
		socket.removeAllListeners();
	}
});