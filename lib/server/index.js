var http = require('http'),
	fs = require('fs'),
	types = require('./mine'),
	url = require('url'),
	path = require('path'),
	config = require('../../config.json');
var DIR = "./app/";
var app = {
	start: function() {
		http.createServer(serverCallback).listen(config.port, config.host);
		console.log('Server running at http://' + config.host + ':' + config.port + '/');
	}
}
var serverCallback = function(request, response) {
	//根据链接区分请求文本，接口
	var realPath = request.url == "/" ? DIR + 'index.html' : DIR + request.url;
	fs.exists(realPath, function(exists) {
		try {
			//请求文件
			if (exists) {
				var contentType = types[path.extname(realPath)] || "text/plain";
				response.writeHead(200, {
					'Content-Type': contentType
				});
				response.write(fs.readFileSync(realPath, 'utf-8'));
				response.end()
			} else {
				//请求接口
				if (request.url.indexOf("api") > 0) {
					write200(response, "{'a':[1,2,34]}")
				} else {
					//请求失败
					write404(response);
				}
				response.end()
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
	}
	var write200 = function(response, data) {
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write(data);
	}
	var write500 = function(response, error) {
		response.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		response.write(error);
	}
}
module.exports = app;