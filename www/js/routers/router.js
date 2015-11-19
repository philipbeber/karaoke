/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Karaoke Router
	// ----------
	var KaraokeRouter = Backbone.Router.extend({
		routes: {
			':song': 'setSong'
		},

	  	execute: function(callback, args, name) {
	  		if (window.location.href.indexOf('showControls') > -1) {
	  			app.showControls = true;
	  		}
		    if (callback) callback.apply(this, args);
	  	},

		setSong: function (param) {
			// Set the current filter to be used
			app.currentSong = param || 1;
			if (typeof app.currentSong === "string") {
				app.currentSong = parseInt(app.currentSong);
			}

			app.songs.trigger('currentSong');
		}
	});

	app.KaraokeRouter = new KaraokeRouter();
	Backbone.history.start();
})();
