'use strict';

/**
 * @ngdoc directive
 * @name kimeokeApp.directive:listItem
 * @description
 * # chooseFromListModal
 */
angular.module('kimeokeApp')
  .directive('listItem', function () {
    return {
      templateUrl: '/views/templates/list-item.html',
      restrict: 'E',
      scope: true,
      link: function postLink(scope, element) {
        element.text('this is the chooseFromListModal directive');
      }
    };
  });
