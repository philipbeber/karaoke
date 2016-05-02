'use strict';

/**
 * @ngdoc service
 * @name kimeokeApp.CatalogService
 * @description
 * # CatalogService
 * Service in the kimeokeApp.
 */
angular.module('kimeokeApp')
  .service('CatalogService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getCatalog = function() {
      var url = '/data/catalog.json';
      return $http.get(url).then(function(catalog) {
        angular.forEach(catalog.data, function(artist) {
          angular.forEach(artist.songs, function(song, idx) {
            var lastSlash = song.lastIndexOf('/');
            var firstDot = song.indexOf('.', lastSlash);
            var title = song.slice(lastSlash + 1, firstDot);
            // Insert space before each upper-case letter
            for(var i = title.length - 1; i > 0; i--) {
              if (title[i].toUpperCase() === title[i]) {
                title = title.slice(0, i) + ' ' + title.slice(i);
              }
            }

            artist.songs[idx] = {
              title: title,
              url: song
            };
          });
        });
        return catalog.data;
      })
        .catch(function(error) {
          console.error('Error downloading ' + url + ': ' + error);
          throw error;
        });
    };

    this.getSong = function(song) {
      return $http({
        method: 'GET',
        url: song.url,
        transformResponse: function (data) {
          var song = {lines: []};
          parseData(song, data);
          return song;
        }
      })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.error('Error downloading ' + song.url + ': ' + error);
        throw error;
      });
    };

    function parseData(song, data) {
      var startOfLine = 0;
      for (var i = 0; i < data.length; i++) {
        if (data.charAt(i) === '\n') {
          parseLine(song, data.slice(startOfLine, i));
          startOfLine = i + 1;
        }
      }
      if (startOfLine < data.length) {
        parseLine(song, data.slice(startOfLine, data.length));
      }
    }

    function parseMetadata(line) {
      var matches = line.match(/{([^:}]+)(:([^}]+))?}/);
      return {
        name: matches[1],
        value: matches[3]
      };
    }

    function parseLine(song, line) {
      line = line.trim();

      // Parse metadata
      if (line.slice(0, 1) === '{') {
        var metadata = parseMetadata(line);
        if (metadata.name === 't' || metadata.name === 'title') {
          song.title = metadata.value;
        }
        else if (metadata.name === 'st' || metadata.name === 'subtitle') {
          song.subtitle = metadata.value;
        }

        // Ignore unrecognized metadata
        return;
      }

      if (line.charAt(0) === '#') {
        // Ignore comments
        return;
      }


      var lineObj = [];
      var startOfWord = 0, inChord = false;
      for (var i = 0; i < line.length; i++) {
        if (line.charAt(i) === '[') {
          flushLine(line, startOfWord, i, inChord, lineObj);
          inChord = true;
          startOfWord = i + 1;
        } else if (line.charAt(i) === ']') {
          flushLine(line, startOfWord, i, inChord, lineObj);
          inChord = false;
          startOfWord = i + 1;
        }
      }
      flushLine(line, startOfWord, i, inChord, lineObj);
      song.lines.push(lineObj);
    }

    function flushLine(line, startOfWord, endOfWord, inChord, lineObj) {
      var part = line.slice(startOfWord, endOfWord);
      if (inChord) {
        part = part + '   ';
      }

      var newPart = '', foundNonSpace = false;
      for (var i = 0; i < part.length; ++i) {
        if (!foundNonSpace && part.charAt(i) === ' ') {
          newPart = newPart + '&nbsp;';
        } else {
          foundNonSpace = true;
          newPart = newPart + part.charAt(i);
        }
      }
      part = newPart;

      newPart = '';
      foundNonSpace = false;
      for (i = part.length - 1; i >= 0; --i) {
        if (!foundNonSpace && part.charAt(i) === ' ') {
          newPart = '&nbsp;' + newPart;
        } else {
          foundNonSpace = true;
          newPart = part.charAt(i) + newPart;
        }
      }
      part = newPart;


      if (inChord) {
        lineObj.push({ chord: part });
      } else {
        if (lineObj.length === 0 ) {
          lineObj.push({ chord: '' });
        }
        lineObj[lineObj.length - 1].lyric = part;
      }
    }

  });
