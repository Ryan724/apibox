var assert = require("assert"),
    should = require("should"),
    Project = require('../lib/server/project');

var pro = {"name": "apibox项1目1", "desc": "项目测试w描述"};

describe('Project 基础功能测试', function() {
    it('可以新增一个项目', function() {
        Project.add(pro).should.be.exactly(true);
    });
    it('不能新增一个名称和描述相同的项目', function() {
        Project.add(pro).should.be.exactly(false);
    });
});