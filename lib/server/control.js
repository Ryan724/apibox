/**
 * apibox 接口处理器;
 * @author zhengpengjie
 */
'use strict';
var Project = require('./project');
var Interface = require('./interface');
var app = require('./appliction')();

var result= function(flag,message){
	return {flag:flag, message:message }
}
/*
*根据接口描述，执行操作
*/
app.get("/api/project/add",function(request){
	var pro ={"name":"zpj","desc":"帅"};
	if(Project.add(pro)) return result(true,"项目添加成功")
	return result(false,"项目添加失败")
});
app.get("/api/interface/writemock", function(request) {
	var pid = "9317f0a3ba10414d6e3ac53badd59906",
		id = "f9632194f56ca08f27b20ffb2c7f35a1",
		mock = "dasdasdasd";
	if (!Interface.writeMockData(pid,id,mock)) return result(false, "接口mock属性添加失败");
	var mockUrl = Mock.generateUrl(pid,id);
	return result(true, mockUrl);
});
app.get("/api/mock/getserverdate", function(request) {
	var pid = "9317f0a3ba10414d6e3ac53badd59906",
		id = "f9632194f56ca08f27b20ffb2c7f35a1";
	var data = Mock.getServerData(pid,id);
	if(!data)  return result(false, data);
	return result(true, data);
});
app.get("/api/interface/add",function(request){
	var api = {"config": {"name": "这是接1口名111", "desc": "这是接口的详细描述", "project":"040a94a003aa3846de1afdb32acf4ec2","url": "http://example.com/demo", "method": ["GET"]}, "request": {"id": "1000"}, "response": {"success": true, "model": {"title": "string", "list": [{"id": 1000, "name": "name-123"}, {"id": 1000, "name": "name-123"} ] } } };
	if(Interface.add(api))return result(true,"接口添加成功")
	return result(false,"接口添加失败")
});
app.get("/api/interface/update",function(request){
	return result(true,"接口更新成功")
});
app.get("/api/interface/delete",function(request){
	if(Interface.deleteApi("9317f0a3ba10414d6e3ac53badd59906","f9632194f56ca08f27b20ffb2c7f35a1"))return result(true,"接口删除成功");
	return result(false,"接口删除失败");	
});
app.get("/api/interface/query",function(request){
	var iftStr = Interface.query("9317f0a3ba10414d6e3ac53badd59906","f9632194f56ca08f27b20ffb2c7f35a1");
	if(iftStr) return result(true,iftStr);
	return result(false,"查询不到任何数据")
});

module.exports = function  (request,callback) {
	app.fire(request,callback)
};