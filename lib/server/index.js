/**
 * apibox 服务端;
 * @author zhengpengjie 2016-1-10
 */
'use strict';
var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	types = require('../constants/mine'),
	control = require('./control'),
	config = require('../../config.json').server;
var DIR = "./app/";
var app = {
	start: function() {
		http.createServer(serverCallback).listen(config.port, config.host);
		console.log('Server running at http://' + config.host + ':' + config.port + '/');
	}
}
var serverCallback = function(request, response) {
	request.setEncoding('utf8');
	var realPath = request.url == "/" ? DIR + 'index.html' : DIR + request.url;
	fs.exists(realPath, function(exists) {
		try {
			//请求文件
			if (exists) {
				var contentType = types[path.extname(realPath)] || "text/plain";
				response.writeHead(200, {
					'Content-Type': contentType
				});
				// response.write(fs.readFileSync(realPath, 'utf-8'));
				response.write(fs.readFileSync(realPath),"binary");
				response.end()
			} else {
				//请求接口
				if (request.url.indexOf("api") > 0) {
					control(request, function(resultStr) {
						write200(response, resultStr);
					});
				} else {
					//请求失败
					write404(response);
				}
			}
		} catch (error) {
			write500(response, error);
		}
	});
	var write404 = function(response) {
		response.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		response.write("This request URL was not found on this server.");
		response.end();
	}
	var write200 = function(response, data) {
		if((typeof data=="object")&&data.flag==false) {
			write404(response);
			return;
		}
		response.writeHead(200, {
			'Content-Type': 'text/plain;charset=UTF-8'
		});
		response.write(data);
		response.end();
	}
	var write500 = function(response, error) {
		response.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		response.write("系统发生异常");
		response.end();
	}
}
module.exports = app;