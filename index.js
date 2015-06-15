'use strict';
/*!
 * Dependencies
 * --------------------------------------------------------------------------*/

var sinon = require('sinon');

/**
 * Creates `before` and `after` mocha statements to stub a `method` on a
 * `target` before running a tests block and restore it afterwards. The stub is
 * stored at a `name` field in the mocha's context object (this).
 *
 * If no `name` is provided, the stubbed function will be stored at the
 * context's `method` property instead of name. This allows for a slightly
 * smaller shorthand for simpler cases.
 *
 * This is simply a syntastic sugar for using sinon with mocha. See more at:
 * http://sinonjs.org
 *
 * @param {Mixed} [name] The key under which to store the sinon stub. Defaults
 * to the `method` value
 * @param {Mixed} target The object to stub. If a string is provided it'll be
 * looked up on the mocha's context
 * @param {Mixed} method The key of the method stub - usually a String.
 * @param {Function} [fn] The stub function if any.
 * @param {Boolean} [mocha_ctx=false] Whether to bind fn to the mocha context.
 *
 * @example
 *    describe('makeRequest(host, body, cb)', function() {
 *      makeStub('Request$prototype$end', request.Request.prototype, 'end',
 *               function(cb) { cb() });
 *
 *      it('calls Request.prototype.end', function() {
 *        this.Request$prototype$end.called.should.be.ok;
 *        // ...
 *      });
 *    });
 */

exports = module.exports = function makeStub(name, target, method, fn, mocha_ctx) {
  if(typeof method === 'function' || !method) {
    mocha_ctx = fn;
    fn = method;
    method = target;
    target = name;
    name = method;
  }

  /* global before, after */
  before(function() {
    construct(this, name, target, method, fn, mocha_ctx);
  });

  after(function() {
    destruct(this, name);
  });
};

/**
 * Like `makeStub` but uses `beforeEach` and `afterEach`.
 *
 * @param {Mixed} [name] The key under which to store the sinon stub. Defaults
 * to the `method` value
 * @param {Mixed} target The object to stub. If a string is provided it'll be
 * looked up on the mocha's context
 * @param {Mixed} method The key of the method stub - usually a String.
 * @param {Function} [fn] The stub function if any.
 * @param {Boolean} [mocha_ctx=false] Whether to bind fn to the mocha context.
 *
 * @example
 *    describe('makeRequest(host, body, cb)', function() {
 *      makeStub.each('Request$prototype$end', request.Request.prototype, 'end',
 *                    function(cb) { cb() });
 *
 *      it('calls Request.prototype.end', function() {
 *        this.Request$prototype$end.called.should.be.ok;
 *        // ...
 *      });
 *    });
 */

exports.each = function(name, target, method, fn, mocha_ctx) {
  if(typeof method === 'function' || !method) {
    mocha_ctx = fn;
    fn = method;
    method = target;
    target = name;
    name = method;
  }

  /* global beforeEach, afterEach */
  beforeEach(function() {
    destruct(this, name);
    construct(this, name, target, method, fn, mocha_ctx);
  });

  afterEach(function() {
    destruct(this, name);
  });
};

function construct(_this, name, target, method, fn, mocha_ctx) {
  if((typeof target) === 'string') target = _this[target];

  _this[name] = sinon.stub(
    target,
    method,
    // support `fn === undefined` and either using the original or
    // the mocha's context.
    fn && (mocha_ctx ? fn.bind(_this) : fn)
  );
}

function destruct(_this, name) {
  if(_this[name] && _this[name].restore) {
    _this[name].restore();
  }
}
