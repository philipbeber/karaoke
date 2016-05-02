'use strict';

/**
 * @ngdoc directive
 * @name kimeokeApp.directive:songScroller
 * @description
 * # songScroller
 */
angular.module('kimeokeApp')
  .directive('songScroller', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element /*, attrs */) {
        element.text('this is the songScroller directive: ' + element.scrollTop());
      }
    };
  });
