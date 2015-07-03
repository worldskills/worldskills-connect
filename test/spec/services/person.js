'use strict';

describe('Service: Person', function () {

  // load the service's module
  beforeEach(module('connectApp'));

  // instantiate service
  var Person;
  beforeEach(inject(function (_Person_) {
    Person = _Person_;
  }));

  it('should do something', function () {
    expect(!!Person).toBe(true);
  });

});
