'use strict';

/**
 * @ngdoc service
 * @name kimeokeApp.listChooserModal
 * @description
 * # listChooserModal
 * Service in the kimeokeApp.
 */
angular.module('kimeokeApp')
  .service('listChooserModal', function ($modal) {
    this.createModal = function(context) {
      var scope = context.scope.$new();
      var modal = $modal({
        scope: scope,
        templateUrl: 'views/templates/choose-from-list-modal.html',
        show: false
      });

      scope.title = context.title;
      scope.list = context.list;
      scope.nameProperty = context.nameProperty;
      var selectedIndex = 0;

      return {
        show: function() {
          angular.forEach(scope.list, function(item, idx) {
            item.isSelected = idx === selectedIndex;
          });
          modal.$promise.then(modal.show());
        },

        hide: function() { modal.$promise.then(modal.hide()); },

        setTitle: function(newTitle) { scope.title = newTitle; },

        setList: function(newList) {
          scope.list = newList;
        },

        setSelectedIndex: function(newIndex) {
          if (scope.list[selectedIndex]) {
            scope.list[selectedIndex].isSelected = false;
          }
          selectedIndex = newIndex;
          scope.list[selectedIndex].isSelected = true;
        }
      };
    };
  });
