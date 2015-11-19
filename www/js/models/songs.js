/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Song Collection
	// ---------------

	// The collection of songs is backed by *localStorage* instead of a remote
	// server.
	var Songs = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Song,

		// Save all of the song items under this example's namespace.
		localStorage: new Backbone.LocalStorage('songs-backbone'),

		// Songs are sorted by their original insertion order.
		comparator: 'order'
	});

	app.songs = new Songs();

	$.ajax({
		url: "songs.txt",
		success: function(data) {
			parseData(data);

			_.defer(function() {
				if (!app.currentSong)
				{
					var firstSong = Math.floor(Math.random() * app.songs.length) + 1;
					app.KaraokeRouter.navigate('' + firstSong, {trigger: true});
				}
			});
		}
	});

	function parseData(data) {
		var startOfLine = 0;
		for (var i = 0; i < data.length; i++) {
			if (data.charAt(i) == '\n') {
				parseLine(data.slice(startOfLine, i));
				startOfLine = i + 1;
			}
		}
		if (startOfLine < data.length) {
			parseLine(data.slice(startOfLine, data.length));
		}
	}

	function parseLine(line) {
		line = line.trim();
		if (line.slice(0, 3) == '{t:') {
			var title = line.slice(3, -1);
			app.songs.add(new app.Song({title: title}));
			return;
		} else if (app.songs.length == 0 || line.charAt(0) == '#') {
			return;
		}

		var songObj = app.songs.at(app.songs.length - 1);
		if (line.slice(0, 4) == '{st:') {
			songObj.set("subtitle", line.slice(4, -1));
			return;
		}

		var lineObj = new app.Line();
		var startOfWord = 0, inChord = false;
		for (var i = 0; i < line.length; i++) {
			if (line.charAt(i) == '[') {
				flushLine(line, startOfWord, i, inChord, lineObj);
				inChord = true;
				startOfWord = i + 1;
			} else if (line.charAt(i) == ']') {
				flushLine(line, startOfWord, i, inChord, lineObj);
				inChord = false;
				startOfWord = i + 1;
			}
		}
		flushLine(line, startOfWord, i, inChord, lineObj);
		songObj.addLine(lineObj);
	}

	function flushLine(line, startOfWord, endOfWord, inChord, lineObj) {
		var part = line.slice(startOfWord, endOfWord);
		if (inChord) {
			part = part + '   ';
		}

		var newPart = '', foundNonSpace = false;
		for (var i = 0; i < part.length; ++i) {
			if (!foundNonSpace && part.charAt(i) == ' ') {
				newPart = newPart + '&nbsp;';
			} else {
				foundNonSpace = true;
				newPart = newPart + part.charAt(i);
			}
		}
		part = newPart;

		newPart = '';
		foundNonSpace = false;
		for (var i = part.length - 1; i >= 0; --i) {
			if (!foundNonSpace && part.charAt(i) == ' ') {
				newPart = '&nbsp;' + newPart;
			} else {
				foundNonSpace = true;
				newPart = part.charAt(i) + newPart;
			}
		}
		part = newPart;


		if (inChord) {
			lineObj.addChord(part);
		} else {
			lineObj.addLyric(part);
		}
	}
})();
