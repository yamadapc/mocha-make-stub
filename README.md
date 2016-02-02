mocha-make-stub
===============
[![Build Status](https://travis-ci.org/yamadapc/mocha-make-stub.png?branch=master)](https://travis-ci.org/yamadapc/mocha-make-stub)
[![Dependency Status](https://david-dm.org/yamadapc/mocha-make-stub.svg)](https://david-dm.org/yamadapc/mocha-make-stub)
[![devDependency Status](https://david-dm.org/yamadapc/mocha-make-stub/dev-status.svg)](https://david-dm.org/yamadapc/mocha-make-stub#info=devDependencies)
- - -

A simple mocha + sinon stubbing helper.

Creates `before` and `after` mocha statements to stub a `method` on a `target`
before running a tests block and restore it afterwards. The stub is stored at a
`name` field in the mocha's context object (this).

If no `name` is provided, the stubbed function will be stored at the context's
`method` property instead of name. This allows for a slightly smaller shorthand
for simpler cases.

This is simply a syntastic sugar for using sinon with mocha. See more at:
http://sinonjs.org

## Params

| Type         | Name                | Description                                          |
|--------------|---------------------|------------------------------------------------------|
| **Mixed**    | *[name]*            | The key under which to store the sinon stub. Defaults to the `method` value           |
| **Mixed**    | *target*            | The object to stub. If a string is provided it'll be looked up on the mocha's context |
| **Mixed**    | *method*            | The key of the method stub - usually a String.                                        |
| **Function** | *[fn]*              | The stub function if any.                                                             |
| **Boolean**  | *[mocha_ctx=false]* | Whether to bind fn to the mocha context.                                              |



## Example

```javascript
var request     = require('superagent'),
    makeStub    = require('mocha-make-stub'),
    makeRequest = require('..'); // something

describe('makeRequest(host, body, cb)', function() {
  makeStub('Request$prototype$end', request.Request.prototype, 'end', function(cb) {
    cb()
  });

  it('calls Request.prototype.end', function() {
    this.Request$prototype$end.called.should.be.ok;
    // ...
  });
});
```

## `makeStub.each([name], target, method, [fn], [mocha_ctx=false])`

Like `makeStub` but uses `beforeEach` and `afterEach`.

## License
Copyright (c) 2014 Pedro Tacla Yamada. Licensed under the MIT license.
Please refer to the [LICENSE](LICENSE) file for more info.

## Donations
Would you like to buy me a beer? Send bitcoin to 3JjxJydvoJjTrhLL86LGMc8cNB16pTAF3y
