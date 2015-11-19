/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Line Model
	// ----------

	// Our basic **Line** model has `title`, `order`, and `completed` attributes.
	app.Line = Backbone.Collection.extend({

		model: app.Chord,

		addChord: function(chord) {
			this.add(new app.Chord({chord: chord}));
		},

		addLyric: function(lyric) {
			if (this.length == 0) {
				this.addChord('');
			}

			this.at(this.length - 1).set('lyric', lyric);
		}

	});
})();
