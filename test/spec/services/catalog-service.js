'use strict';

describe('Service: CatalogService', function () {

  // load the service's module
  beforeEach(module('kimeokeApp'));

  // instantiate service
  var CatalogService;
  beforeEach(inject(function (_CatalogService_) {
    CatalogService = _CatalogService_;
  }));

  it('should do something', function () {
    expect(!!CatalogService).toBe(true);
  });

});
