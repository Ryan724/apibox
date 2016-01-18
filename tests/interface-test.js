var assert = require("assert"),
	should = require("should"),
	Interface = require('../lib/server/interface'),
	Project = require('../lib/server/project'),
	md5 = require('MD5');


var timestamp=new Date().getTime();
var pro=Project.projects[0];
var api={"config":{"name":pro.name+timestamp,"desc":pro.desc+timestamp,"project":pro.id,"url":"http://example.com/demo","method":"GET","createTime":timestamp,"request": {"id": "number"}, "response": {"success": "boolean", "model": {"title": "string", "date": "date", "list": [{"id": "number", "name": "string"}]}}}};			

describe('Interface 基础功能测试', function() {
	describe('接口 add 测试', function() {
		it('可以在已有项目下新增一个接口', function() {			
			var result=Interface.add(api);			
			assert.equal(result[0],true);

		});
		// it('不可以在不存在的项目下新增一个接口', function() {
		// 	var cloneObj = JSON.parse(JSON.stringify(baseApi));
		// 	cloneObj.config.project = "不存在的pid";			
		// 	var result=Interface.add(cloneObj);
		// 	console.log(result)
		// 	assert.equal(result[0],false);
		// });
		it('不可以在已有项目下新增名称相同的接口', function() {
			var cloneObj = JSON.parse(JSON.stringify(api));
			var result=Interface.add(cloneObj);
			assert.equal(result[0],false);
			assert.equal(result[1],"该项目下已存在此名称和描述的接口");
		});
	});
	describe('接口 query 测试', function() {
		it('可以根据存在的项目id,接口id查询到数据', function() {			
			( Interface.query(api.config.project, api.config.id)==JSON.stringify(api) ).should.be.exactly(true);
		});
		it('不可以不存在的项目id,接口id查询到数据', function() {
			(Interface.query("不存在的pid","不存在的id") == null).should.be.exactly(true);
		});
	});
	describe('接口 update 测试', function() {
		it('可以更新已存在接口数据', function() {
			var cloneObj = JSON.parse(JSON.stringify(api));
			cloneObj.config.name = "我是被update的数据1";
			var result=Interface.update(cloneObj);
			assert.equal(result[0],true);			
		});
		// it('不可以更新不存在接口数据', function() {
		// 	var cloneObj = JSON.parse(JSON.stringify(savedApi));
		// 	cloneObj.config.project = "不存在的pid";
		// 	var result=Interface.update(cloneObj);
		// 	assert.equal(result[0],false);
		// 	assert.equal(result[1],"该接口服务器上没有");
		// });
	});
	describe('接口 delete 测试', function() {
		it('不可以删除不存在接口数据', function() {
			Interface.deleteApi("不存在的pid","不存在的id").should.be.exactly(false);
		});
		it('可以删除已存在接口数据', function() {
			Interface.deleteApi(api.config.project, api.config.id).should.be.exactly(true);
		});
	});

});