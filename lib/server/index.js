var http = require('http'),
	fs = require('fs'),
	types = require('./mine'),
	url = require('url'),
	path = require('path')
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
		if (exists) {
			var contentType = types[path.extname(realPath)] || "text/plain";
			response.writeHead(200, {
				'Content-Type': contentType
			});
			response.write(fs.readFileSync(realPath, 'utf-8'));
			response.end()
		} else {
			//接口请求？或者404
			write404(response);
			response.end()
		}
	});

	var write404 = function(response) {
		response.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		response.write("This request URL was not found on this server.");
	}
	var write500 = function(response) {
		response.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		response.write("This request URL  read error.");
	}
}
module.exports = app;