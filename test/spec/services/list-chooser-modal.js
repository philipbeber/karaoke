'use strict';

describe('Service: listChooserModal', function () {

  // load the service's module
  beforeEach(module('kimeokeApp'));

  // instantiate service
  var listChooserModal;
  beforeEach(inject(function (_listChooserModal_) {
    listChooserModal = _listChooserModal_;
  }));

  it('should do something', function () {
    expect(!!listChooserModal).toBe(true);
  });

});
