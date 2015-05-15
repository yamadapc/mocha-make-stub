'use strict'; /* global describe, it, before */
var makeStub = require('./');

var originals = {
  fn1: function() {},
  fn2: function() {},
};
var obj = {
  fn1: originals.fn1,
  fn2: originals.fn2,
};

describe('if a before hook fails', function() {
  before(function() {
    throw new Error('Fail');
  });

  makeStub(obj, 'fn2', function() {});

  it('the after script does\'t run', function() {
  });
});
