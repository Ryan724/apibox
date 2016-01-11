/*
 *项目的增加
 *zhengpengjie 2016-1-11
 */
var fs = require('fs'),
    _ = require('lodash'),
    md5 = require('MD5');
var projectArr,
    projectJsonPath = "./apilib/project-index.json";
fs.readFile(projectJsonPath, function(err, data) {
    if (err) throw err;
    projectArr = data.length > 0 ? JSON.parse(data) : [];
})

var project = {
    /** 新增项目
     * @param {[Object]}  newProject   {name:"", desc:"" }
     * @returns {[boolean]} [添加失败]
     */
    add: function(newProject) {
        if (!isUnqiue(newProject)) return false;
        bulidProject(newProject);
        updateIndex(newProject);
    }
}

function bulidProject(newProject) {
    newProject.createTime = (new Date()).valueOf();
    projectArr.push(newProject);
}

function isUnqiue(newProject) {
    return !_.find(projectArr, newProject);
}

function updateIndex(prj) {
    var dirPath = "./apilib/" + md5(prj.name + prj.createTime);
    var createDir = function(dirPath) {
        var deferred = Promise.defer();
        fs.exists(dirPath, function(exists) {
            if (exists) {
                deferred.resolve();
            } else {
                fs.mkdir(dirPath, function() {
                    console.log("createDir ok")
                    deferred.resolve();
                })
            }
        })
        return deferred.promise;
    }
    var writeFile = function(filePath, data) {
        console.log(filePath, data)
        var deferred = Promise.defer();
        fs.writeFile(filePath, data, 'utf-8', function(err, data) {
            if (!err) {
                console.log("writeFile ok")
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });
        return deferred.promise;
    }
     Promise.all(writeFile(projectJsonPath,JSON.stringify(projectArr)),createDir(dirPath))
}


module.exports = project;