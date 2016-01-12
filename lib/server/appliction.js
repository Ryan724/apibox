/*
 *处理请求函数
 *zhengpengjie 2016-1-11
 */
'use strict';
var EventEmitter = require('events').EventEmitter,
	util = require('util');


module.exports = function() {

	function Appliction() {};

	util.inherits(Appliction,EventEmitter);

	Appliction.prototype.post = buildFun("POST");

	Appliction.prototype.get = buildFun("GET");

	Appliction.prototype.put = buildFun("PUT");

	Appliction.prototype.delete = buildFun("DELETE");

	Appliction.prototype.fire = function(request, callback) {
		var  eventName=request.url +":"+request.method
		this.emit(eventName, request, callback)
	}

	//偏函数
	function buildFun(type) {
		return function(url, postFun) {
				var eventName = url+":"+type;
				this.on(eventName, function(request, callback) {
					var result = postFun(request);
					callback(JSON.stringify(result));
				})
		};
	}
	var app = new Appliction();

	return app;
};