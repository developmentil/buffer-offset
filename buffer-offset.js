var util = require('util'),
	SlowBuffer = require('buffer').SlowBuffer;


module.exports = exports = function() {	
	exports.super_.apply(this, arguments);
	
	this._offset = 0;
};
util.inherits(exports, Buffer);
var proto = exports.prototype;

exports.SlowBuffer = function() {	
	exports.SlowBuffer.super_.apply(this, arguments);
	
	this._offset = 0;
};
util.inherits(exports.SlowBuffer, SlowBuffer);
var prot2 = exports.SlowBuffer.prototype;

exports.convert = function(buffer) {
	buffer = buffer.slice();
	buffer._offset = 0;
	
	if(buffer.__proto__ === Buffer.prototype) {
		buffer.__proto__ = exports.prototype;
	} else if(buffer.__proto__ === SlowBuffer.prototype) {
		buffer.__proto__ = exports.SlowBuffer.prototype;
	} else {
		throw new Error('the given object must be instance of Buffer or SlowBuffer');
	}
	
	return buffer;
};


proto.position = 
prot2.position = function(offset) {
	if(offset === undefined)
		return offset;
	
	this._offset = offset;
	return this;
};

proto.left = 
prot2.left = function() {
	return (this.length - this._offset);
};



// 8 bits
['UInt8', 'Int8'].forEach(function(type) {
	extendOffset(type, 1);
});

// 16 bits
['UInt16LE', 'UInt16BE', 'Int16LE', 'Int16BE'].forEach(function(type) {
	extendOffset(type, 2);
});

// 32 bits
['UInt32LE', 'UInt32BE', 'Int32LE', 'Int32BE', 'FloatLE', 'FloatBE'].forEach(function(type) {
	extendOffset(type, 4);
});

// 64 bits
['DoubleLE', 'DoubleBE'].forEach(function(type) {
	extendOffset(type, 8);
});

proto.append = 
prot2.append = function(buf, sourceStart, sourceEnd) {
	if(!sourceStart)
		sourceStart = 0;
	if(!sourceEnd)
		sourceEnd = buf.length;
	
	var offset = this._offset;
	this._offset += sourceEnd - sourceStart;
	
	buf.copy(this, offset, sourceStart, sourceEnd);
	return this;
};

proto.get = 
prot2.get = function(length) {
	if(!length)
		length = this.length - this._offset;
	
	var offset = this._offset;
	this._offset += length;
	
	return this.slice(offset, this._offset);
};

proto.appendWrite = 
prot2.appendWrite = function(str, length, encoding) {
	if(!length)
		length = str.length;
	
	var offset = this._offset;
	this._offset += length;
	
	return this.write(str, offset, length, encoding);
};

proto.getString = 
prot2.getString = function(encoding, length) {
	if(!length)
		length = this.length;
	
	var offset = this._offset;
	this._offset += length;
	
	return this.toString(encoding, offset, this._offset);
};

proto.appendFill = 
prot2.appendFill = function(value, length) {
	if(!length)
		length = this.length - this._offset;
	
	var offset = this._offset;
	this._offset += length;
	
	return this.fill(value, offset, this._offset);
};

proto.extend = 
prot2.extend = function(newLength) {
	var buf = new exports(newLength);
	return buf.append(this);
};

proto.trim = 
prot2.trim = function() {
	return this.slice(0, this._offset);
};



// local helpers

function extendOffset(type, size) {
	proto['append' + type] = 
	prot2['append' + type] = function(value, noAssert) {
		var offset = this._offset;
		this._offset += size;

		return this['write' + type](value, offset, noAssert);
	};
	
	proto['get' + type] = 
	prot2['get' + type] = function(noAssert) {
		var offset = this._offset;
		this._offset += size;
	
		return this['read' + type](offset, noAssert);
	};
}