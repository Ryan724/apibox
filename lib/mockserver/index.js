/**
 * apibox mock Server;
 */
'use strict';
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    types = require('../constants/mine'),
    controller = require('./controller'),
    config = require('../../config.json').mockserver;
var DIR = parentDir(parentDir(__dirname)) +"/app/";
var appMock = {
    start: function() {
        http.createServer(serverCallback).listen(config.port, config.host);
        console.log('Mock Server running at http://' + config.host + ':' + config.port + '/');
    }
}
var serverCallback = function(request, response) {
    request.setEncoding('utf8');
    if (request.url.indexOf("api") > 0) {
        controller(request,response, function(resultStr) {
            write200(response, resultStr);
        });
    }
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
function parentDir(path){
    path= path.split("\\")
    path.pop();
    return path.join("\\");
}
module.exports = appMock;