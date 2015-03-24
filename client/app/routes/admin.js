import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function () {
		return [];
	},
	activate: function () {
		this.controllerFor("admin").subscribe();
	},
	deactivate: function () {
		this.controllerFor("admin").unsubscribe();
 	}
});