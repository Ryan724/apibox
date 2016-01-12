var assert = require("assert"),
	should = require("should"),
	Interface = require('../lib/server/interface');

var baseApi = {
	"config": {
		"name": "接口实例01",
		"desc": "接口实例01的详细描述",
		"project": "9317f0a3ba10414d6e3ac53badd59906",
		"url": "http://example.com/demo",
		"method": ["GET"]
	},
	"request": {
		"id": "number"
	},
	"response": {
		"success": "boolean",
		"model": {
			"title": "string",
			"date": "date",
			"list": [{
				"id": "number",
				"name": "string"
			}]
		}
	}
};
describe('Interface 基础功能测试', function() {
	describe('接口 add 测试', function() {
		it('可以在已有项目下新增一个接口', function() {
			Interface.add(baseApi).should.be.exactly(false);
		});
		it('不可以在不存在的项目下新增一个接口', function() {
			var cloneObj = JSON.parse(JSON.stringify(baseApi));
			cloneObj.config.project = "hahahahahhaID";
			Interface.add(pro).should.be.exactly(false);
		});
		it('不可以在已有项目下新增名称相同的接口', function() {
		
			Interface.add(pro).should.be.exactly(false);
		});
		it('不可以在已有项目下新增名称相同的接口', function() {
			Interface.add(pro).should.be.exactly(false);
		});
		it('不可以在已有项目下新增名称相同的接口', function() {
			Interface.add(pro).should.be.exactly(false);
		});
	});
	describe('接口 delete 测试', function() {

	});
	describe('接口 update 测试', function() {

	});
	describe('接口 query 测试', function() {

	});
});