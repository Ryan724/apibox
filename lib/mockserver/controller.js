/**
*@name controller
*@description:mock Controller
*@author: Richard
*/
var url=require('url')
	service=require("./service.js"),
	app=require("../server/appliction")();

var result=function(flag,message){
	return {flag:flag,message:message};
}
/**
*接收所有mock url
*返回mock data
*/
app.all("/api/mocks/*",function(request,response,data){
	var pathname=url.parse(request.url).pathname;
	var paths=pathname.split('/');
	var hashcode=paths[paths.length-1];
	return service.getMockData(hashcode);
});
/**
*查询mock数据
*/
app.get("/api/mock/query",function(request,response,data){
	data=JSON.parse(data[0]);

	return service.queryMockData(data);
});

/**
*保存mock数据
*/
app.post("/api/mock/save",function(request,response,data){
	data=JSON.parse(data[0]);	
	return service.saveMockData(data);
});
/*
*生成mock url
*/
app.get("/api/mock/generateUrl",function(request,response,data){
	data=JSON.parse(data[0]);	
	return service.generateUrl(data);
});


app.get("/api/mock/data",function(request,response,data){
	var url=request.url;	
	/*return service.generateUrl(data);*/
});
module.exports=function(request,response,callback) {
	app.fire(request,response,callback)
};