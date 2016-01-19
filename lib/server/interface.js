/*
 *项目
 *zhengpengjie 2016-1-11
 */
'use strict';
var fs = require('fs'),
	_ = require('lodash'),
	md5 = require('MD5'),
	Project = require('./project');

function parentDir(path){
    path= path.split("\\")
    path.pop();
    return path.join("\\");
}
var Interface = function() {}

Interface.prototype = {

	constructor: Interface,
	/**
	 * 接口添加函数
	 * @param {[Object]} ift 原始接口对象
	 */
	add: function(ift) {
		this.ift = ift;
		var onlyArr = this._isUnqiue()
		if (!onlyArr[0]) return onlyArr;
		this._buildIft();
		this._updateInfo();
		this._writeApiFile();
		return [true,ift];
	},
	/**
	 * 接口更新函数
	 * @param {[Object]} ift 始接口更新后对象
	 */
	update: function(ift) {
		this.ift = ift;
		var oldIft = this.query(ift.config.project, ift.config.id);
		var oldIftIndex = this._queryIndex(ift.config.project, ift.config.id);
		if(!oldIft) return [false,"该接口服务器上没有"];
		oldIft = JSON.parse(oldIft);
		_.assign(oldIft, ift);
		_.assign(oldIftIndex, ift.config);
		Project.updateInfoFile(this.projects);
		this._writeApiFile();
		return [true,oldIft];
	},
	/**
	 * 接口查询函数
	 * @param  {[string]} pid projectId
	 * @param  {[string]} id  interfaceId
	 * @return {[object]}     查询后的接口
	 */
	query: function(pid, id,isValidate) {
		var apiPath =  parentDir(parentDir(__dirname))+"/apilib/"+pid+"/"+id;
		if(isValidate&&!this._queryIndex(pid, id)) return null;
		if(!fs.existsSync(apiPath)) return null;
		return fs.readFileSync(apiPath,"utf-8");
	},
	/**
	 * 接口删除函数
	 * @param  {[string]} pid projectId
	 * @param  {[string]} id  interfaceId
	 * @return {[boolean]}     是否删除成功
	 */
	deleteApi: function(pid, id) {
		var projects = this._getProjects();
		var project = _.find(projects, {id: pid}),
			apiPath =  parentDir(parentDir(__dirname))+"/apilib/" + pid + "/" + id,
			index = -1;
		if(!project) return false;
		_.each(project.apis, function(item, i) {
			if (item&&item.id == id) {
				index = i;
			}
		});
		if(index == -1) return false;
		delete project.apis[index];
		Project.updateInfoFile(projects);
		if (fs.existsSync(apiPath)) fs.unlinkSync(apiPath);
		return true;
	},
	/**
	 *新增或者修改ift mock属性
	 * @param  {[type]} pid      [description]
	 * @param  {[type]} id       [description]
	 * @param  {[type]} mockData [description]
	 * @return {[type]}          [description]
	 */
	writeMockData:function(pid,id,mockData){
		var oldIft = this.query(pid,id);
		if(!oldIft) return false;
		var ift = JSON.parse(oldIft);
		ift.mock = mockData;
		this.ift=ift;
		this._writeApiFile();
		return true;
	},
	_queryIndex: function(pid, id) {
		this.projects = this._getProjects();
		var project = _.find(this.projects, {
			id: pid
		});
		if (!project) return false;
		var ift = _.find(project.apis, {
			id: id
		})
		if (!ift) return false;
		return ift;

	},
	_buildIft: function() {
		var ift = this.ift;
		ift.config.createTime = (new Date()).valueOf();
		ift.config.id = md5(ift.config.name + ift.config.createTime);
	},
	_updateInfo: function() {
		var projects = this._getProjects();
		var ift = this.ift;
		_.find(projects, {
			id: ift.config.project
		}).apis.push(ift.config)
		Project.updateInfoFile(projects);
	},
	_writeApiFile: function() {
		var ift = this.ift;
		var apiPath =  parentDir(parentDir(__dirname))+"/apilib/" + ift.config.project + "/" + ift.config.id;
		fs.existsSync(apiPath) ? fs.writeFileSync(apiPath, JSON.stringify(ift), "utf-8") : fs.appendFileSync(apiPath, JSON.stringify(ift), "utf-8");
	},
	_getProjects:function(){
			return Project.queryAllData();
	},
	_isUnqiue: function() {
		var ift = this.ift,
			project = _.find(this._getProjects(), {
				id: ift.config.project
			}),
			api = {
				name: ift.config.name,
				desc: ift.config.desc
			}
		if (!project) return [false,"系统出错，项目不存在"];
		if (_.find(project.apis, api)) return [false,"该项目下已存在此名称和描述的接口"];
		return [true];
	}
}
var api = new Interface();
module.exports = {
	add: function(ift) {
		return api.add(ift);
	},
	update: function(ift) {
		return api.update(ift);
	},
	query: function(pid, id) {
		return api.query(pid, id);
	},
	deleteApi: function(pid, id) {
		return api.deleteApi(pid, id);
	},
	writeMockData: function(pid,id,mockData){
		return api.writeMockData(pid,id,mockData)
	}
};