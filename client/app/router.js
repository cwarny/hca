import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.resource("requests", { path: "/" });
	this.resource("admin", { path: "/admin" });
	this.resource("login");
});

export default Router;