'use strict';

/**
 * @ngdoc function
 * @name kimeokeApp.controller:ToplevelCtrl
 * @description
 * # ToplevelCtrl
 * Controller of the kimeokeApp
 */
angular.module('kimeokeApp')
  .controller('ToplevelCtrl', function ($scope, listChooserModal, $window, CatalogService) {

    var artists = [];
    var currArtist;
    var state = 0;
    var selectedArtistIndex = 0;
    var selectedSongIndex = 0;

    var chooseArtistModal = listChooserModal.createModal({
      nameProperty: 'artist',
      scope: $scope
    });

    var chooseSongModal = listChooserModal.createModal({
      nameProperty: 'title',
      scope: $scope
    });

    var catalog = CatalogService.getCatalog();

    catalog.then(function(artistList) {
      artists = artistList;
      chooseArtistModal.setTitle('Choose Artist');
      chooseArtistModal.setList(artistList);

      selectedArtistIndex = Math.floor(Math.random() * artistList.length);
      chooseArtistModal.setSelectedIndex(selectedArtistIndex);

      currArtist = artists[selectedArtistIndex];
      selectedSongIndex = Math.floor(Math.random() * currArtist.songs.length);
      refreshSong();
    });

    function refreshSong() {
      console.log('artist = ' + currArtist.artist + '; song = ' + currArtist.songs[selectedSongIndex].title);
      CatalogService.getSong(currArtist.songs[selectedSongIndex]).then(function(song) {
        $scope.selectedSong = song;
        console.log('getSong returned: ' + song.title + '/' + song.subtitle);
      });
    }

    function setState(newState) {

      var oldState = state;
      state = newState;

      if (newState === 0) {
        $window.scroll(0, 0);
        refreshSong();
      }

      if (oldState === 1) {
        chooseArtistModal.hide();
      }

      if (newState === 1) {
        chooseArtistModal.show();
      }

      if (oldState === 2) {
        chooseSongModal.hide();
      }

      if (newState === 2) {
        currArtist = artists[selectedArtistIndex];
        selectedSongIndex = selectedSongIndex % currArtist.songs.length;
        chooseSongModal.setTitle(currArtist.artist);
        chooseSongModal.setList(currArtist.songs);
        chooseSongModal.setSelectedIndex(selectedSongIndex);
        chooseSongModal.show();
      }
    }

    function go(direction) {
      if (state === 0) {
        $window.scroll(0, $window.scrollY + 50 * direction);
      }
      if (state === 1) {
        selectedArtistIndex = (selectedArtistIndex + artists.length + direction) % artists.length;
        chooseArtistModal.setSelectedIndex(selectedArtistIndex);
      }
      if (state === 2) {
        selectedSongIndex = (selectedSongIndex + currArtist.songs.length + direction) % currArtist.songs.length;
        chooseSongModal.setSelectedIndex(selectedSongIndex);
      }
    }

    $scope.keyPress = function($event) {
      var keyCode = $event.which;
      $scope.keyPressed = keyCode;

      catalog.then(function() {
        var char = String.fromCharCode(keyCode).toUpperCase();

        if (char === 'Z') {
          setState((state + 2) % 3);
        } else if (char === 'X') {
          setState((state + 1) % 3);
        } else if (char === 'N') {
          go(-1);
        } else if (char === 'M') {
          go(1);
        }
      });
    };
  });
