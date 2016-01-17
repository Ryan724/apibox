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

	Appliction.prototype.all = buildFun("All");

	Appliction.prototype.fire = function(request, response, callback) {
		var self = this,
			eventName = request.url + ":" + request.method;
		var result = this.checkEventName(eventName);
		if (result[0]) {
			eventName = result[1];
			var body = [];
			request.addListener('data', function(data) {
				body.push(data);
			});
			request.addListener('end', function() {
				self.emit(eventName, request, response, callback, body);
			});
			return;
		}
		callback({
			flag: false
		}); //404
	};

	Appliction.prototype.checkEventName = function(eventName) {
		var checkStart = function(bindUrl, originUrl) {
			var isStartEnd = bindUrl.substring(bindUrl.length - 1) == "*";
			var isContainBindUrl = originUrl.indexOf(bindUrl.substring(0, bindUrl.length - 1)) > -1;
			if (isStartEnd && isContainBindUrl) {
				return bindUrl;
			}
			return false;
		}
		if (this.evtNames.indexOf(eventName) > -1) return [true, eventName];
		eventName = eventName.split(":");
		_.each(this.evtNames, function(item) {
			var items = item.split(":");
			if (items[1] == "All" || eventName[1] == items[1]) {
				var checkResult = checkStart(items[1], eventName[1]);
				if (checkResult != false) {
					return [true, item]
				}
				return [false];
			}
		})
		return [false];
	}

	//偏函数
	function buildFun(type) {
		return function(url, methodCbk) {
			var eventName = url + ":" + type;
			this.evtNames.push(eventName);
			this.on(eventName, function(request, response, callback, body) {
				var result = methodCbk(request, response, body);
				if (result != false) callback(JSON.stringify(result));
			})
		};
	}
	var app = new Appliction();

	return app;
};