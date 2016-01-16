/**
*
*/
var service=require("./service.js"),
	app=require("../server/appliction")();

var result=function(flag,message){
	return {flag:flag,message:message};
}

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
	var dd=service.saveMockData(data);
	console.log(dd);
	return dd;
});

module.exports=function(request,response,callback) {
	app.fire(request,response,callback)
};