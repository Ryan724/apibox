/*
 *项目
 *zhengpengjie 2016-1-11
 */
'use strict';
var fs = require('fs'),
    _ = require('lodash'),
    PATH = require('path'),
    md5 = require('MD5');
var infoJsonPath = parentDir(parentDir(__dirname))+"/apilib/info.json";

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
        this.updateInfoFile(this.projects);
        return _.pick(newProject, ["name", "desc", "id"]);
    },
    queryAll: function() {
        this.projects = this.queryAllData();
        var allProject = [];
        _.each(this.projects, function(item) {
            var pro = _.pick(item, ["name", "desc", "id"]);
            allProject.push(pro)
        });
        return allProject;
    },
    queryAllData:function(){
         var projects = fs.readFileSync(infoJsonPath, 'utf-8');
         projects = projects?JSON.parse(projects):[];
         return projects;
    },
    updateInfoFile: function(projects) {
        var writeData  =projects?JSON.stringify(projects):JSON.stringify(this.projects);
        fs.writeFileSync(infoJsonPath, writeData, 'utf-8');
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
        var dirPath = parentDir(parentDir(__dirname))+"/apilib"
        if(!fs.existsSync(dirPath)){
           fs.mkdirSync(dirPath);
        }
        fs.appendFileSync(path, "", "utf-8");
        return [];
    }
}
function parentDir(path){
    path= path.split("\\")
    path.pop();
    return path.join("\\");
}
var P =new Project();
module.exports = P;