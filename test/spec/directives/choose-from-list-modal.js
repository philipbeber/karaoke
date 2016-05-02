'use strict';

describe('Directive: chooseFromListModal', function () {

  // load the directive's module
  beforeEach(module('kimeokeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<choose-from-list-modal></choose-from-list-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chooseFromListModal directive');
  }));
});
