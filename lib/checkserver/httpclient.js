var http = require('http');  
var querystring = require('querystring');

var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'assess.tms.beisen.com',
  port: 80,
  path: '/ExamineManager/ExamineTesterApi?activityId=228014&tenantId=100013&examinerId=681&snId=0',
  // method: 'POST',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Content-Length': postData.length
  // }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
  res.on('end', function() {
    console.log('No more data in response.')
  })
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();

