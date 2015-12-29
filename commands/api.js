// 依赖模块
var path = require('path');
var fs = require('fs');
var server = require('../lib/server/');
var grunt = require('grunt');
var cwd = process.cwd();
grunt.cli({
    gruntfile:cwd+'/Gruntfile.js'
},"server");
console.log(gruntTask)
// 导出命令
module.exports = {
    exec: function(argv) {
        // console.log(cwd)
        if (argv.init || argv.i) {
            var root = argv.init || argv.i;
            console.log(1)
        }
        else if (argv.sync || argv.s) {
            console.log(2)
        }
        else if (argv.server || argv.e) {
            console.log(3)
        }
    }
}