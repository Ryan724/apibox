/**
 * apibox 接口处理器;
 * @author zhengpengjie
 */
'use strict';
var Project = require('./project');
var Interface = require('./interface');
var httpClient = require('../checkserver/httpclient');
var app = require('./appliction')();

var result= function(flag,message){
	return {flag:flag, message:message }
}
/*
*项目请求
*/
app.post("/api/project/add",function(request,data){
	data = JSON.parse(data[0]);
	var projectObj = Project.add(data);
	if(projectObj==false) return result(false,"项目添加失败");
	return result(true,projectObj);
});
app.get("/api/project/queryall",function(request,response,data){
	var resultData =Project.queryAll();
	return result(true,resultData);
});
app.get("/api/project/queryalldata",function(request,response,data){
	var resultData =Project.queryAllData();
	return result(true,resultData);
});
/**
 * api的请求
 */
app.post("/api/interface/writemock", function(request,response,data) {
	data = JSON.parse(data[0]);
	if (!Interface.writeMockData(data.pid,data.id,data.mock)) return result(false, "接口mock属性添加失败");
	var mockUrl = Mock.generateUrl(pid,id);
	return result(true, mockUrl);
});

app.post("/api/mock/getserverdate", function(request,response,data) {
	data = JSON.parse(data[0]);
	httpClient.getServerData(data.pid,data.id,function(serverData){
		serverData = JSON.stringify(serverData)
		response.writeHead(200, {
			'Content-Type': 'text/plain;charset=UTF-8'
		});
		response.write(serverData);
		response.end();
	});
	return false;
});
app.post("/api/interface/add",function(request,response,data){
	data = JSON.parse(data[0]);
	var obj = Interface.add(data);
	return result(obj[0],obj[1])
});
app.post("/api/interface/update",function(request,response,data){
	data = JSON.parse(data[0]);
	var obj = Interface.update(data)
	return result(obj[0],obj[1])
});
app.post("/api/interface/delete",function(request,response,data){
	if(Interface.deleteApi(data.pid,data.id))return result(true,"接口删除成功");
	return result(false,"接口删除失败");	
});
app.post("/api/interface/query",function(request,response,data){
	data = JSON.parse(data[0]);
	var iftStr = Interface.query(data.pid,data.id);
	if(iftStr) return result(true,iftStr);
	return result(false,"查询不到任何数据")
});

module.exports = function  (request,response,callback) {
	app.fire(request,response,callback)
};