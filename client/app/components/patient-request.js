import Ember from "ember";

export default Ember.Component.extend({
	tagName: "tr",
	classNameBindings: ["req.handler:success"],

	owned: function() {
		return this.get("req.handler") === this.get("session.username");
	}.property("req.handler"),
	
	actions: {
		handle: function(req) {
			this.set("req.handler", this.get("session.username"));
			this.sendAction("handled", req);
		},
		complete: function(req) {
			this.sendAction("completed", req);
		},
		release: function(req) {
			this.set("req.handler", null);
			this.sendAction("released", req);	
		}
	}
});