'use strict';

describe('Controller: ToplevelctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('kimeokeApp'));

  var ToplevelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ToplevelCtrl = $controller('ToplevelCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(ToplevelCtrl.awesomeThings.length).toBe(3);
  });
});
