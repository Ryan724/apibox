/*
 *项目
 *zhengpengjie 2016-1-11
 */
'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    md5 = require('MD5');
var infoJsonPath = "./apilib/info.json",
    projectArr = (function(path) {
        var data = fs.readFileSync(path);
        return data.length > 0 ? JSON.parse(data) : [];
    })(infoJsonPath);


var Project = {
    projects: projectArr,
        /** 新增项目
         * @param {[Object]}  newProject   {name:"", desc:"" }
         * @returns {[boolean]} [添加失败]
         */
    add: function(newProject) {
        if (!isUnqiue(newProject)) return false;
        bulidProject(newProject);
        createDir(newProject);
        this.updateInfoFile(newProject);
        return true;
    },
    updateInfoFile: function() {
        fs.writeFileSync(infoJsonPath, JSON.stringify(this.projects), 'utf-8');
    }
}

function createDir(newProject) {
    var dirPath = "./apilib/" + newProject.id;
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
}

function isUnqiue(newProject) {
    return !_.find(projectArr, newProject);
}

function bulidProject(newProject) {
    newProject.createTime = (new Date()).valueOf();
    newProject.id = md5(newProject.name + newProject.createTime);
    newProject.apis = [];
    projectArr.push(newProject);
}



module.exports = Project;