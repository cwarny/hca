import Ember from "ember";

export default Ember.Controller.extend({
	error: null,
	credentials: function() {
		return { username: this.get("username"), password: this.get("password") };
	}.property("username", "password"),
	actions: {
		authenticate: function() {
			var _this = this;
			this.set("error", null);
			this.get("session").authenticate("authenticator:custom", this.get("credentials")).then(function() {
				// authentication was successful
			}, function(err) {
				_this.set("error", err.responseText);
			});
		},
		signUp: function() {
			var _this = this;
			this.set("error", null);
			Ember.$.ajax({
				type: "POST",
				url: "api/users",
				data: JSON.stringify(_this.get("credentials")),
				contentType: "application/json",
				success: function() {
					_this.get("session").authenticate("authenticator:custom", _this.get("credentials"));
				},
				error: function(err) {
					_this.set("error", err.responseText);
				}
			});
		}
	}
});