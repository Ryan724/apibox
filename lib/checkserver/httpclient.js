var http = require('http'),
  URL = require('url'),
  Interface = require('../server/interface');

var HttpClient = function() {};

HttpClient.prototype = {

  constructor: HttpClient,

  getServerData: function(pid, id, callback) {
    var apiData = Interface.query(pid,id)
    this.api = JSON.parse(apiData);
    try{
      this.createRequest(callback)  
    }catch(error){
         callback({"status": 500 });
    }
  },

  createRequest: function(callback) {
    var options = this.getRequestHeader();
    var req = http.request(options, function(res) {
      if (res.statusCode == 200) {
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        var data = [];
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          data.push(chunk);
        });
        res.on('end', function() {
          callback({"status": 200, "data":data })
        })
      } else {
        callback({
          "status": res.statusCode
        })
      }

    });
    req.on('error', function(e) {
      callback({
          "status": 500
        })
    });
    req.write(JSON.stringify(this.api["request"]));
    req.end();
  },

  getRequestHeader: function() {
    var url = URL.parse(this.api["config"]["url"]);
    var options = {
      hostname: url.host,
      port: 80,
      path: url.path,
      method: this.api["config"]["method"],
      headers: {
        'Content-Length': JSON.stringify(this.api["request"]).length
      }
    }
    return options;
  }
}
var httpClient =new HttpClient();
module.exports={
  getServerData:function(pid, id, callback){
    httpClient.getServerData(pid, id, callback)
  }
}