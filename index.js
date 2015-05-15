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
  var hookExecuted = false;

  /* global before, after */
  before(function() {
    if((typeof target) === 'string') target = this[target];

    this[name] = sinon.stub(
      target,
      method,
      // support `fn === undefined` and either using the original or
      // the mocha's context.
      fn && (mocha_ctx ? fn.bind(this) : fn)
    );
    hookExecuted = true;
  });

  after(function() {
    if(hookExecuted) {
      if(!this[name]) {
        throw new Error(
          '`mocha-make-stub`\'s `before` hook ran, but I can\'t find ' +
          '`this.' + name + '`. Please report this bug to:\n' +
          '  https://github.com/yamadapc/mocha-make-stub'
        );
      }

      this[name].restore();
    }
  });
};
