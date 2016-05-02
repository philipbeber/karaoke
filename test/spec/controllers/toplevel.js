'use strict';

describe('Controller: ToplevelctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('kimeokeApp'));

  var ToplevelctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ToplevelctrlCtrl = $controller('ToplevelctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ToplevelctrlCtrl.awesomeThings.length).toBe(3);
  });
});
