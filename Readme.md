[buffer-offset.js](https://npmjs.org/package/buffer-offset)
==========

Native [Node.js](http://nodejs.org/) Buffer wrapper that keeps track of your read and write offsets.


Install
=======

	$ npm install buffer-offset


Simple Usage
=====

```js
var BufferOffset = require('buffer-offset');

var buffer = new BufferOffset(10);

buffer.appendInt8(0x2f);
buffer.appendUInt32BE(0x00112233);

console.log(buffer.trim()); // outputs <Buffer 2f 00 11 22 33>
console.log(buffer.left()); // outputs 5

buffer.append(new Buffer('aabbccddee', 'hex'));

console.log(buffer); // outputs <Buffer 2f 00 11 22 33 aa bb cc dd ee>

buffer.position(1);

console.log(buffer.getUInt32BE() === 0x00112233); // outputs "true"

console.log(buffer.getString('hex')); // outputs "aabbccddee"

//console.log(Buffer.SlowBuffer instanceof Buffer);

var buf = new Buffer('ffeeddccbbaa', 'hex'),
	bf = BufferOffset.convert(buf);
	
console.log(bf.getUInt8()); // output 255
```


License
=======

buffer-offset.js is freely distributable under the terms of the MIT license.

Copyright (c) 2015 Moshe Simantov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.