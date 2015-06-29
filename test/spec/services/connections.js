'use strict';

describe('Service: Connections', function () {

  // load the service's module
  beforeEach(module('connectApp'));

  // instantiate service
  var Connections;
  beforeEach(inject(function (_Connections_) {
    Connections = _Connections_;
  }));

  it('should do something', function () {
    expect(!!Connections).toBe(true);
  });

});
