mocha-make-stub
===============

A simple mocha + sinon stubbing helper.

Creates `before` and `after` mocha statements to stub a `method` on a `target`
before running a tests block and restore it afterwards. The stub is stored at a
`name` field in the mocha's context object (this).

This is simply a syntastic sugar for using sinon with mocha. See more at:
http://sinonjs.org

## Params

| Type         | Name                | Description                                          |
|--------------|---------------------|------------------------------------------------------|
| **Mixed**    | *name*              | The key under which to store the sinon stub.         |
| **Mixed**    | *target*            | The object to stub. If a string is provided it'll be |
| **Mixed**    | *method*            | The key of the method stub - usually a String.       |
| **Function** | *[fn]*              | The stub function if any.                            |
| **Boolean**  | *[mocha_ctx=false]* | Whether to bind fn to the mocha                      |


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
