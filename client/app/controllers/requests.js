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
			.on("message", function(value) {
				console.log(value);
			})
			.emit("authenticate", { token: this.get("session.token") });
	},

	unsubscribe: function () {
		var socket = this.get("websocket.socket");
		socket.removeAllListeners();
	},

	actions: {
		sendRequest: function(value) {
			this.get("websocket").send(value);
		}
	}
});