/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Song Model
	// ----------

	// Our basic **Song** model has `title`, `order`, and `completed` attributes.
	app.Song = Backbone.Model.extend({

		// Default attributes for the song
		// and ensure that each song created has `title` and `completed` keys.
		defaults: {
			title: 'Unset title',
			subtitle: ''
		},

		initialize: function() {
			this.set('lines', []);
		},

		addLine: function(line) {
			this.get('lines').push(line);
		}
	});
})();
