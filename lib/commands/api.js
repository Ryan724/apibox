// 依赖模块
var path = require('path');
var fs = require('fs');
var app = require('../server/');
var grunt = require('grunt');
var exec = require('child_process').exec
var cwd = process.cwd();

module.exports = {
    exec: function(argv) {
        if (argv.init || argv.i) {
            grunt.cli({
                gruntfile: cwd + '/Gruntfile.js'
            });
            grunt.tasks("init")
        } else if (argv.w || argv.watch) {
            grunt.cli({
                gruntfile: cwd + '/Gruntfile.js'
            });
            grunt.tasks("watch")
        } else if (argv.m || argv.mock) {
            app.mock();
        } else if (argv.server || argv.s) {
            app.start();
        } else if (argv.test||argv.t) {
            exec('npm test', function(err, out) {
                console.log(out);
                err && console.log(err);
            });
        }
    }
}