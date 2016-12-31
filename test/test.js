'use strict';
//---------------------------------------------------------------------------
// File: test.js
//
// Usage: npm test
//---------------------------------------------------------------------------

var should = require('chai').should();
var model = require('../app/public/js/model.js');

describe('data-pump: model', function () {
  it('should pass unit tests', function () {
     model.unitTests().should.equal(true);
  });
});
