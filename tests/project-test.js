var assert = require("assert"),
    should = require("should"),
    Project = require('../lib/server/project');

var pro = {"name": "UnitTest3", "desc": "单元测试3"};

describe('Project 基础功能测试', function() {
    it('可以新增一个项目', function() {
    	var timestamp=new Date().getTime();
    	var pro1={"name":"UnitTest"+timestamp,"desc":"单元测试"+timestamp}
    	var result=Project.add(pro1);
    	
		assert.equal(result.name,pro1.name);
		assert.equal(result.desc,pro1.desc);
    	
        /*Project.add(pro).should.be.exactly(true);*/
    });
    it('不能新增一个名称和描述相同的项目', function() {
        Project.add(pro).should.be.exactly(false);
    });
});