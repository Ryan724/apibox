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
app.get("/api/interface/writemock", function(request,response,data) {
	var pid = "1c67bb1faaf0c0255d71c8f4bc58e846",
		id = "3fbf4672d4c07a1f392775b3c593899c",
		mock = "dasdasdasd";
	if (!Interface.writeMockData(pid,id,mock)) return result(false, "接口mock属性添加失败");
	var mockUrl = Mock.generateUrl(pid,id);
	return result(true, mockUrl);
});

app.get("/api/mock/getserverdate", function(request,response,data) {
	data = JSON.parse(data[0]);
	console.log(data,"<------------------------->")
	var pid = "1c67bb1faaf0c0255d71c8f4bc58e846",
		id = "3fbf4672d4c07a1f392775b3c593899c";
	var callback=function(serverData){
		console.log(serverData);
		response.writeHead(200, {
			'Content-Type': 'text/plain;charset=UTF-8'
		});
		response.write(serverData,"<------------------------->");
		response.end();
	}
	httpClient.getServerData(pid,id,callback);
	return false;
});
app.post("/api/interface/add",function(request,response,data){
	data = JSON.parse(data[0]);
	var obj = Interface.add(data);
	return result(obj[0],obj[1])
});
app.post("/api/interface/update",function(request,response,data){
	return result(true,"接口更新成功")
});
app.post("/api/interface/delete",function(request,response,data){
	if(Interface.deleteApi("9317f0a3ba10414d6e3ac53badd59906","f9632194f56ca08f27b20ffb2c7f35a1"))return result(true,"接口删除成功");
	return result(false,"接口删除失败");	
});
app.post("/api/interface/query",function(request,response,data){
	var iftStr = Interface.query("9317f0a3ba10414d6e3ac53badd59906","f9632194f56ca08f27b20ffb2c7f35a1");
	if(iftStr) return result(true,iftStr);
	return result(false,"查询不到任何数据")
});

module.exports = function  (request,response,callback) {
	app.fire(request,response,callback)
};