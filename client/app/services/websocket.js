import Ember from 'ember';

/* global io */

export default Ember.Service.extend({
	_setup: function() {
		this.socket = io("http://localhost:3000/hca");
	}.on("init"),

	createRequest: function(value) {
		this.socket.emit("createRequest", value);
	},

	handleRequest: function(value) {
		this.socket.emit("handleRequest", value);
	},

	completeRequest: function(value) {
		this.socket.emit("completeRequest", value);
	},

	releaseRequest: function(value) {
		this.socket.emit("releaseRequest", value);
	}
});