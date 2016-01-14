/*
 *项目
 *zhengpengjie 2016-1-11
 */
'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    md5 = require('MD5');
var infoJsonPath = "./apilib/info.json";

var Project = function() {
    this.projects = readInfoFile(infoJsonPath);
};
Project.prototype = {
    constructor: Project,
    /** 新增项目
     * @param {[Object]}  newProject   {name:"", desc:"" }
     * @returns {[boolean]} [添加失败]
     */
    add: function(newProject) {
        if (!this.isUnqiue(newProject)) return false;
        this.bulidProject(newProject);
        createDir(newProject.id);
        this.updateInfoFile(newProject);
        return _.pick(newProject, ["name", "desc", "id"]);
    },
    queryAll: function() {
        this.projects = readInfoFile(infoJsonPath);
        var allProject = [];
        _.each(this.projects, function(item) {
            var pro = _.pick(item, ["name", "desc", "id"]);
            allProject.push(pro)
        });
        return allProject;
    },

    updateInfoFile: function(newProject) {
        fs.writeFileSync(infoJsonPath, JSON.stringify(this.projects), 'utf-8');
    },

    bulidProject: function(newProject) {
        newProject.createTime = (new Date()).valueOf();
        newProject.id = md5(newProject.name + newProject.createTime);
        newProject.apis = [];
        this.projects.push(newProject);
    },
    
    isUnqiue: function(newProject) {
        return !_.find(this.projects, newProject);
    }
}

function createDir(id) {
    var dirPath = "./apilib/" + id;
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
}

function readInfoFile(path) {
    if (fs.existsSync(path)) {
        var data = fs.readFileSync(path);
        return data.length > 0 ? JSON.parse(data) : [];
    } else {
        fs.appendFileSync(path, "", "utf-8");
        return [];
    }
}
var P =new Project();
module.exports = P;