import Ember from "ember";

export default Ember.Controller.extend({
	websocket: Ember.inject.service(),

	subscribe: function () {
		var ws = this.get("websocket");
		var socket = ws.get("socket");
		socket
			.on("authenticated", function() {
				console.log("authenticated");
			})
			.emit("authenticate", { token: this.get("session.token") });
	},

	unsubscribe: function () {
		var socket = this.get("websocket.socket");
		socket.removeAllListeners();
	},

	actions: {
		createRequest: function(value) {
			this.get("websocket").createRequest(value);
		}
	}
});