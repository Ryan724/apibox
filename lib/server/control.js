var Project = require('./project');
var Interface = require('./interface');
var appliction = require('./appliction')();

var result= function(flag,message){
	return {flag:flag, message:message }
}
/*
*项目添加
*/
appliction.post("/api/project/add",function(request){
	var pro = {
		name:"zpj",
		desc:"帅"
	};
	Project.add(pro);
	return result(true,"添加成功")
});
appliction.post("/api/item/update",function(request){
	return result(true,"添加成功")
});
appliction.post("/api/item/delete",function(request){
	return result(true,"添加成功")
});
appliction.post("/api/item/query",function(request){
	return result(true,"添加成功")
});

module.exports = function  (request,callback) {
	appliction.fire(request,callback)
};