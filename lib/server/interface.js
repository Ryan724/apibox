/*
 *项目
 *zhengpengjie 2016-1-11
 */
'use strict';
var fs = require('fs'),
	_ = require('lodash'),
	md5 = require('MD5'),
	Project = require('./project');

var projects = Project.projects;

var Interface = function() {}

Interface.prototype = {

	constructor: Interface,
	/**
	 * 接口添加函数
	 * @param {[Object]} ift 原始接口对象
	 */
	add: function(ift) {
		this.ift = ift;
		if (!this._isUnqiue()) return false;
		this._buildIft();
		this._updateInfo();
		this._writeApiFile();
		return true;
	},
	/**
	 * 接口更新函数
	 * @param {[Object]} ift 始接口更新后对象
	 */
	update: function(ift) {
		this.ift = ift;
		var oldIft = this.query(ift.config.project, ift.config.id);
		var oldIftIndex = this._queryIndex(ift.config.project, ift.config.id);
		if(!oldIft) return false;
		oldIft = JSON.parse(oldIft);
		_.assign(oldIft, ift);
		_.assign(oldIftIndex, ift.config);
		Project.updateInfoFile();
		this._writeApiFile();
		return true;
	},
	/**
	 * 接口查询函数
	 * @param  {[string]} pid projectId
	 * @param  {[string]} id  interfaceId
	 * @return {[object]}     查询后的接口
	 */
	query: function(pid, id,isValidate) {
		var apiPath = "./apilib/"+pid+"/"+id;
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
		var project = _.find(projects, {id: pid}),
			apiPath = "./apilib/" + pid + "/" + id,
			index = -1;
		if(!project) return false;
		_.each(project.apis, function(item, i) {
			if (item&&item.id == id) {
				index = i;
			}
		});
		if(index == -1) return false;
		delete project.apis[index];
		Project.updateInfoFile();
		if (fs.existsSync(apiPath)) fs.unlinkSync(apiPath);
		return true;
	},
	_queryIndex: function(pid, id) {
		var project = _.find(projects, {
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
		var ift = this.ift;
		_.find(projects, {
			id: ift.config.project
		}).apis.push(ift.config)
		Project.updateInfoFile();
	},

	_writeApiFile: function() {
		var ift = this.ift;
		var apiPath = "./apilib/" + ift.config.project + "/" + ift.config.id;
		fs.existsSync(apiPath) ? fs.writeFileSync(apiPath, JSON.stringify(ift), "utf-8") : fs.appendFileSync(apiPath, JSON.stringify(ift), "utf-8");
	},

	_isUnqiue: function() {
		var ift = this.ift,
			project = _.find(projects, {
				id: ift.config.project
			}),
			api = {
				name: ift.config.name,
				desc: ift.config.desc
			}
		if (!project) return false;// throw new Error("系统出错，项目不存在")
		if (_.find(project.apis, api)) return false;
		return true;
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
	}
};