var http = require('http'),
	fs = require('fs'),
	config = require('../../config.json');

var app = {
	start: function() {
		fs.readFile('./app/index.html', function(err, html) {
			if (err) {
				throw err;
			}
			http.createServer(function(request, response) {
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});
				response.write(html);
			}).listen(config.port, config.host);
			console.log('Server running at http://' + config.host + ':' + config.port + '/');
		});
	}
}

module.exports = app;