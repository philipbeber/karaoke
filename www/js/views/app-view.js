/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '.karaokeapp',

		songTemplate: _.template($('#song-template').html()),

		controlsTemplate: _.template($('#controls-template').html()),

		events: {
			'keypress body': 'keypress',
			'keypress .main': 'keypress'
		},

		initialize: function () {
			this.$main = this.$('.main');
			this.$controls = this.$('.controls');
			this.$scrollContainer = $('body');

			this.listenTo(app.songs, 'currentSong', _.debounce(this.renderSong.bind(this), 0));
			app.songs.trigger('currentSong');

			$('body').keypress(this.keypress.bind(this));
		},

		renderSong: function () {
			if (app.currentSong) {
				var song = app.songs.at(app.currentSong - 1);
				this.$main.html(this.songTemplate({
					song: song
				}));
			}
		},

		scrollDown: function() {
			this.$scrollContainer.scrollTop(this.$scrollContainer.scrollTop() - 50);
		},

		scrollUp: function() {
			this.$scrollContainer.scrollTop(this.$scrollContainer.scrollTop() + 50);
		},

		nextSong: function() {
			var nextSong = app.currentSong - 1;
			if (nextSong < 1) {
				nextSong = app.songs.length;
			}
			app.KaraokeRouter.navigate('' + nextSong, {trigger: true});
			this.$scrollContainer.scrollTop(0);
		},

		prevSong: function() {
			var nextSong = app.currentSong + 1;
			if (nextSong > app.songs.length) {
				nextSong = 1;
			}
			app.KaraokeRouter.navigate('' + nextSong, {trigger: true});
			this.$scrollContainer.scrollTop(0);
		},

		keypress: function(e) {
			if (e.which === 'z'.charCodeAt()) {
				app.inScanMode = false;
			} else if (e.which === 'x'.charCodeAt()) {
				app.inScanMode = true;
			} else if (e.which === 'n'.charCodeAt()) {
				if (app.inScanMode) {
					this.nextSong();
				} else {
					this.scrollDown();
				}
			} else if (e.which === 'm'.charCodeAt()) {
				if (app.inScanMode) {
					this.prevSong();
				} else {
					this.scrollUp();
				}
			}
		}
	});
})(jQuery);
