// 依赖模块
var path = require('path');
var fs = require('fs');
var app = require('../server/');
var mockApp=require('../mockserver/');
var grunt = require('grunt');
var exec = require('child_process').exec
var cwd = process.cwd();
function parentDir(path){
    path= path.split("\\")
    path.pop();
    return path.join("\\");
}
grunt.cli({
    gruntfile:parentDir(parentDir(__dirname))+ '/Gruntfile.js'
});
module.exports = {
    exec: function(argv) {
        if (argv.init || argv.i) {;
            grunt.tasks("init");
        } else if (argv.w || argv.watch) {
            grunt.tasks("watch")
        } else if (argv.m || argv.mock) {
            mockApp.start();
        } else if (argv.server || argv.s) {
            mockApp.start();
            app.start();
        } else if (argv.test||argv.t) {
            var orderStr =(argv.test==true||argv.t==true)
                ?'npm test'
                :'mocha '+(argv.test||argv.t)
            exec(orderStr, function(err, out) {
                console.log(out);
                err && console.log(err);
            });
        }
    }
}