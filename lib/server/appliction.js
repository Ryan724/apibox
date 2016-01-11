var Events = require('events').EventEmitter;
module.exports = function() {
	console.log(request)
	function Appliction(){
		return this;
	};
	//偏函数
	function buildFun(type){
		return function(url,postFun) {
		if(this.reqType==type){
			Events.on(url,function(request,callback){
				var result = postFun(request);
				callback(JSON.stringify(result));	
			})
		}
	};
	}
	Appliction.prototype.post = buildFun("post");
	Appliction.prototype.get = buildFun("get");
	Appliction.prototype.put = buildFun("put");
	Appliction.prototype.delete = buildFun("delete");
	Appliction.prototype.fire=function(request,callback){
		Events.emit(request.url,request,callback)
	}
	return  Appliction;
};