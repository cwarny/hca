import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function () {
		return [];
	},
	beforeModel: function(transition) {
		if (this.get("session.isAuthenticated")) {
			if (this.get("session.scope") !== "admin") this.transitionTo("requests");	
		} else {
			this.transitionTo("login");
		}
	},
	activate: function () {
		this.controllerFor("admin").subscribe();
	},
	deactivate: function () {
		this.controllerFor("admin").unsubscribe();
 	}
});