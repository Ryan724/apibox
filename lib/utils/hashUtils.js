/**
*hashUtils.js
*生成hash code
*@author:richard
*/


//递增生成hash code
exports.additive = function (key, prime) {
	key = key instanceof Buffer ? key : new Buffer(key);
	prime = prime == undefined ? 0xffffffff : prime;
	for (var hash = key.length, i = 0; i < key.length; i++) {
		hash += key[i];
	}
	return (hash % prime);
}

exports.rotating = function(key) {
	key = key instanceof Buffer ? key : new Buffer(key);
	for (var hash = key.length, i = 0; i<key.length; ++i) {
		hash = (hash << 4) ^ (hash >> 28) ^ key[i];
	}
	return hash;

}

exports.bernstein = function(key, prime) {
	key = key instanceof Buffer ? key : new Buffer(key);
	prime = prime == undefined ? 0xffffffff : prime;
	var hash = 0;
	for (i=0; i<key.length; ++i) {
		hash =  (hash << 5 + hash) + key[i];
	}
	return hash;
}

exports.fnv = function (key){
	key = key instanceof Buffer ? key : new Buffer(key);
	var p = 16777619, hash = 0x811C9DC5;
	for(var i=0; i< key.length; i++) {
		hash = (hash * p) ^ key[i];
	}
	hash += hash << 13;
	hash ^= hash >> 7;
	hash += hash << 3;
	hash ^= hash >> 17;
	hash += hash << 5;
	return hash;
}

exports.fnv1a = function (key){
	key = key instanceof Buffer ? key : new Buffer(key);
	var p = 16777619, hash = 0x811C9DC5;
	for(var i=0; i< key.length; i++) {
		hash = (hash ^ key[i]) * p;
	}
	hash += hash << 13;
	hash ^= hash >> 7;
	hash += hash << 3;
	hash ^= hash >> 17;
	hash += hash << 5;
	return hash;
}
