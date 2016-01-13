var assert = require("assert"),
	should = require("should"),
	Interface = require('../lib/server/interface');
//baseApi修改名称就可以，project要可用
var baseApi = {"config": {"name": "dasdasdasdasdasd", "desc": "接口实例01的详细描述", "project": "040a94a003aa3846de1afdb32acf4ec2", "url": "http://example.com/demo", "method": ["GET"] }, "request": {"id": "number"}, "response": {"success": "boolean", "model": {"title": "string", "date": "date", "list": [{"id": "number", "name": "string"}] } } };
//savedApi copy一个已存在贴在下面
var savedApi = {"config":{"name":"这是接1口名","desc":"这是接口的详细描述","project":"040a94a003aa3846de1afdb32acf4ec2","url":"http://example.com/demo","method":["GET"],"createTime":1452608337185,"id":"a08af4811ee1a36b649f41630f9f78ca"},"request":{"id":"1000"},"response":{"success":true,"model":{"title":"string","list":[{"id":1000,"name":"name-123"},{"id":1000,"name":"name-123"}]}}}


describe('Interface 基础功能测试', function() {
	describe('接口 add 测试', function() {
		it('可以在已有项目下新增一个接口', function() {
			Interface.add(baseApi).should.be.exactly(true);
		});
		it('不可以在不存在的项目下新增一个接口', function() {
			var cloneObj = JSON.parse(JSON.stringify(baseApi));
			cloneObj.config.project = "不存在的pid";
			Interface.add(cloneObj).should.be.exactly(false);
		});
		it('不可以在已有项目下新增名称相同的接口', function() {
			var cloneObj = JSON.parse(JSON.stringify(baseApi));
			Interface.add(cloneObj).should.be.exactly(false);
		});
	});
	describe('接口 query 测试', function() {
		it('可以根据存在的项目id,接口id查询到数据', function() {
			( Interface.query(savedApi.config.project, savedApi.config.id)==JSON.stringify(savedApi) ).should.be.exactly(true);
		});
		it('不可以不存在的项目id,接口id查询到数据', function() {
			(Interface.query("不存在的pid","不存在的id") == null).should.be.exactly(true);
		});
	});
	describe('接口 update 测试', function() {
		it('可以更新已存在接口数据', function() {
			var cloneObj = JSON.parse(JSON.stringify(savedApi));
			cloneObj.config.name = "我是被update的数据1"
			Interface.update(cloneObj).should.be.exactly(true);
		});
		it('不可以更新不存在接口数据', function() {
			var cloneObj = JSON.parse(JSON.stringify(savedApi));
			cloneObj.config.project = "不存在的pid";
			Interface.update(cloneObj).should.be.exactly(false);
		});
	});
	describe('接口 delete 测试', function() {
		it('不可以删除不存在接口数据', function() {
			Interface.deleteApi("不存在的pid","不存在的id").should.be.exactly(false);
		});
		it('可以删除已存在接口数据', function() {
			Interface.deleteApi(savedApi.config.project, savedApi.config.id).should.be.exactly(true);
		});
	});

});