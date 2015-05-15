'use strict'; /* global describe, it, before */
var assert = require('assert');
var makeStub = require('./');

var originals = {
  fn1: function() {},
  fn2: function() {},
};
var obj = {
  fn1: originals.fn1,
  fn2: originals.fn2,
};

describe('mocha-make-stub', function() {
  describe('before the tests', function() {
    makeStub('fn1Stub', obj, 'fn1', function() {});

    it('stubs the functions with sinon', function() {
      assert(obj.fn1 === this.fn1Stub, 'Function is stored in the context');
      assert(originals.fn1 !== this.fn1Stub, 'Stored function is stubbed');
      assert(originals.fn1 !== obj.fn1, 'Object\'s function is stubbed');
    });

    makeStub(obj, 'fn2', function() {});

    it('stores with the method\'s name if `name` isn\'t provided', function() {
      assert(obj.fn2 === this.fn2, 'Function is stored in the context');
      assert(originals.fn2 !== this.fn2, 'Stored function is stubbed');
      assert(originals.fn2 !== obj.fn2, 'Object\'s function is stubbed');
    });
  });

  describe('after the tests', function() {
    it('things are restored', function() {
      assert(!this.fn1);
      assert(!this.fn2);

      assert(obj.fn1 === originals.fn1);
      assert(obj.fn2 === originals.fn2);
    });
  });

  describe('before the tests - binding to `this`', function() {
    before(function() {
      this.obj2 = function() {};
      this.obj2.fn1 = function() {};
    });

    makeStub('obj2', 'fn1', function() {
      return this.getsContext;
    }, true);

    it('stubs the functions with sinon', function() {
      assert(this.obj2.fn1 === this.fn1, 'Function is stored in the context');
      this.getsContext = true;
      assert(this.obj2.fn1(), 'Function is bound to the context');
    });
  });

  describe('after the tests', function() {
    it('things are restored', function() {
      assert(!this.fn1);
      assert(!this.fn2);

      assert(obj.fn1 === originals.fn1);
      assert(obj.fn2 === originals.fn2);
    });
  });
});
