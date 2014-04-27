mocha-make-stub
===============

_Not published yet._

A simple mocha + sinon stubbing helper.

Creates `before` and `after` mocha statements to stub a `method` on a `target`
before running a tests block and restore it afterwards. The stub is stored at a
`name` field in the mocha's context object (this).

This is simply a syntastic sugar for using sinon with mocha. See more at:
http://sinonjs.org

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

## License
Copyright (c) 2014 Pedro Tacla Yamada. Licensed under the MIT license.
Please refer to the [LICENSE](LICENSE) file for more info.
