/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Chord Model
	// ----------

	// Our basic **Chord** model has `title`, `order`, and `completed` attributes.
	app.Chord = Backbone.Model.extend({
		// Default attributes for the chord
		// and ensure that each chord created has `title` and `completed` keys.
		defaults: {
			chord: '',
			lyric: ''
		}
	});
})();
