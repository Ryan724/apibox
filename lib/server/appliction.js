/*
 *处理请求函数
 *zhengpengjie 2016-1-11
 */
'use strict';
var EventEmitter = require('events').EventEmitter,
	util = require('util');


module.exports = function() {

	function Appliction() {};

	util.inherits(Appliction, EventEmitter);

	Appliction.prototype.evtNames = [];

	Appliction.prototype.post = buildFun("POST");

	Appliction.prototype.get = buildFun("GET");

	Appliction.prototype.put = buildFun("PUT");

	Appliction.prototype.delete = buildFun("DELETE");

	Appliction.prototype.fire = function(request, callback) {
		var eventName = request.url + ":" + request.method;
		if (this.checkEventName(eventName)) {
			this.emit(eventName, request, callback);
			return;
		}
		callback({flag:false});//404
	};

	Appliction.prototype.checkEventName = function(eventName) {
		if (this.evtNames.indexOf(eventName) > -1) return true;
		return false;
	}

	//偏函数
	function buildFun(type) {
		return function(url, methodCbk) {
			var eventName = url + ":" + type;
			this.evtNames.push(eventName);
			this.on(eventName, function(request, callback) {
				var result = methodCbk(request);
				callback(JSON.stringify(result));
			})
		};
	}
	var app = new Appliction();

	return app;
};