import Ember from 'ember';

/* global io */

export default Ember.Service.extend({
	_setup: function() {
		this.socket = io("http://localhost:3000/hca");
	}.on("init"),

	send: function(message) {
		this.socket.emit("message", message);
	}
});